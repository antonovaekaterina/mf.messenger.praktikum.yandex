export function identity(value) {
    return value;
}

export function last(list) {
  if (!(Array.isArray(list) && list.length)) {
    return undefined;
  }
  
  const lastIndex = list.length - 1;
  return list[lastIndex];
}  

function first(list) {
  if (!(Array.isArray(list) && list.length)) {
    return undefined;
  }

  return list[0];	
}


function simpleRange(start = 0, end) {
  const getNextItaratorObj = value => {
    const hasValue = value !== undefined;
   
    return {
      done: !hasValue, 
      ...(hasValue ? {value} : {})
    };
  };
  
  const hasEndValue = end !== undefined;
  
  const range = {
    start: hasEndValue ? start : 0,
    end: hasEndValue ? end : start,
    [Symbol.iterator]: function() {
      return {
        current: this.start,
        last: this.end,
        next: function() {
          let value;
          
          if (this.last < 0 && this.current > this.last) {
            value = this.current--;
          } else if (this.last > 0 && this.current < this.last) {
            value = this.current++;
          }
          
          return getNextItaratorObj(value);
        }
      }
    }
  };

  return Array.from(range);
}


function rangeRight(start, end, step) {
	return range(start, end, step, true);
};

function range(start = 0, end, step = 1, isRight = false) {
  const hasEndValue = end !== undefined;

  const counter = {
    value: hasEndValue ? start : 0,
    max: hasEndValue ? end : start,
    step: Math.abs(step),
    refresh() {
      this.value = this.max > 0 
        ? (this.value + this.step) 
        : (this.value - this.step)
    },
    needIterate(){
      return this.max > 0 
        ? (this.value < this.max) 
        : (this.value > this.max)
    }
  };
  
  const arr = [];
  
  const refreshArr = () => {
    arr.push(counter.value);
    counter.refresh();
  };
    
  while (counter.needIterate()) {
    refreshArr();
  }
  
  if (isRight) {
    arr.reverse();
  }
  
  return arr;
}

function isEmpty(value) {
  if (typeof value === 'string') {
    return !value.length;
  }
  
  if (Array.isArray(value)) {
    return !value.length;
  }
  
  if (!(value && typeof value === 'object')) {
    return true;
  }
 
  if (value instanceof Map || value instanceof Set) {
    return !value.size;
  } else {
    return !Object.keys(value).length;
  }
}