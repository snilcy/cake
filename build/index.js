// src/type.ts
var isNull = (element) => element === null;
var isArray = Array.isArray;
var isObject = (element) => typeof element === "object" && !isNull(element) && !isArray(element);
var isObjectLiteral = (element) => element && Object.getPrototypeOf(element) === Object.prototype;
var isBrowserEnvironment = new Function("try {return this===window;}catch(e){ return false;}");
var isNodeEnvironment = new Function("try {return this===global;}catch(e){return false;}");

// src/array.ts
var first = (array) => array.at(0);
var last = (array) => array.at(-1);
var lastIndex = (array) => array.length - 1;
var updateById = (array, id, callback) => {
  array[id] = callback(array[id]);
};
var toArray = (data) => isArray(data) ? data : [data];
var replace = (arr, target, value) => arr.map((item) => item === target ? value : item);
var move = (arr, from, to) => {
  const copy = [...arr];
  copy.splice(to, 0, copy.splice(from, 1)[0]);
  return copy;
};
var sizeSplit = (arr, sliceSize) => {
  const slices = Math.round(arr.length / sliceSize);
  const result = [];
  if (slices === 0)
    return [[]];
  for (let i = 0;i < slices; i++) {
    result.push(arr.slice(i * sliceSize, i * sliceSize + sliceSize));
  }
  return result;
};
// src/async.ts
var wait = (time, ...extra) => {
  const start = Date.now();
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      duration: Date.now() - start,
      end: Date.now(),
      extra,
      start
    }), time);
  });
};
var compose = async (...promisesList) => {
  const list = promisesList.map((promises) => toArray(promises));
  for (const promises of list) {
    await Promise.all(promises);
  }
};
var serial = async (method, argsList) => {
  const result = [];
  for (const args of argsList) {
    result.push(await method(...args));
  }
  return result;
};
// src/class.ts
var getConstructorName = (element) => element?.constructor?.name;
var isExtends = (target, targetParent) => target && Object.getPrototypeOf(target) === targetParent;
// src/date.ts
var ms = {
  fromDays: (days = 1) => days * ms.fromHours(24),
  fromHours: (hours = 1) => hours * ms.fromMinutes(60),
  fromMinutes: (minutes = 1) => minutes * ms.fromSeconds(60),
  fromSeconds: (seconds = 1) => seconds * 1000,
  fromWeek: (weeks = 1) => weeks * ms.fromDays(7),
  fromYears: (years = 1) => years * ms.fromDays(365)
};
// src/dom.ts
var isTextNode = (node) => node instanceof Text;
// src/memory.ts
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) {
    return "0";
  } else {
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["bytes", "Kb", "Mb", "Gb", "Tb"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}
var getObjectSize = (object) => formatBytes(Buffer.from(JSON.stringify(object)).byteLength);
// src/object.ts
var shallowClone = (target) => ({ ...target });
var deepClone = (target) => {
  const result = {};
  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      const value = target[key];
      result[key] = isObjectLiteral(value) ? deepClone(value) : value;
    }
  }
  return result;
};
var shallowMerge = (first2, second = {}) => ({
  ...first2,
  ...second
});
var deepMerge = (first2, second) => {
  const target = deepClone(first2);
  for (const key in second) {
    if (Object.hasOwnProperty.call(second, key)) {
      const secondValue = second[key];
      const targetValue = target[key];
      target[key] = isObjectLiteral(targetValue) && isObjectLiteral(secondValue) ? deepMerge(targetValue, secondValue) : secondValue;
    }
  }
  return target;
};
var join = (target, callback, separator = " ") => Object.keys(target).map((key) => callback(key, target[key])).join(separator);
var map = (target, callback) => {
  const result = {};
  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      const value = target[key];
      result[key] = callback(value, key);
    }
  }
  return result;
};
var flat = (target, delimeter = "-") => Object.entries(target).reduce((result, [key, value]) => {
  if (isObjectLiteral(value)) {
    for (const [flatKey, flatValue] of Object.entries(flat(value))) {
      result[[key, flatKey].join(delimeter)] = flatValue;
    }
  } else {
    result[key] = value;
  }
  return result;
}, {});
var optionalPath = (objPath, target, value) => {
  objPath.reduce((result, path, id) => {
    result[path] = id === objPath.length - 1 ? value : result[path] || {};
    return result[path];
  }, target);
};
var diff = (first2, second) => {
  const result = {};
  for (const [key, firstValue] of Object.entries(first2)) {
    if (Object.hasOwn(second, key)) {
      const secondValue = second[key];
      if (isObjectLiteral(firstValue) && isObjectLiteral(secondValue)) {
        const objectDiff = diff(firstValue, secondValue);
        if (Object.keys(objectDiff).length > 0) {
          result[key] = objectDiff;
        }
      } else if (firstValue !== secondValue) {
        result[key] = secondValue;
      }
    } else {
      result[key] = second[key];
    }
  }
  return result;
};
var getOptionalPath = (obj, pathList = []) => {
  for (let i = 0;i < pathList.length; i++) {
    const path = pathList[i];
    if (obj && typeof obj === "object") {
      obj = obj[path];
      if (i === pathList.length - 1) {
        return obj;
      }
    }
  }
};
var isShallowEqual = (first2, second) => {
  if (!isObject(first2) || !isObject(second))
    return false;
  if (first2 === second)
    return true;
  const firstKeys = Object.keys(first2);
  const secondKeys = Object.keys(second);
  return firstKeys.length === secondKeys.length && firstKeys.every((key) => first2[key] === second[key]);
};
// src/perfomance.ts
var throttle = (fn, wait2 = 300) => {
  let inThrottle, lastFn, lastTime;
  return function() {
    const args = arguments, context = this;
    if (inThrottle) {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait2) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait2 - (Date.now() - lastTime), 0));
    } else {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    }
  };
};
var debounce = (fn, ms2 = 300, params = {}) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (params.onStart)
        params.onStart();
      const result = fn.apply(this, args);
      if (result instanceof Promise) {
        result.finally(() => {
          if (params.onEnd)
            params.onEnd();
        });
      } else {
        if (params.onEnd)
          params.onEnd();
      }
    }, ms2);
  };
};

class RateLimit {
  interval;
  parallel = Infinity;
  perInterval;
  intervalData = this.updateIntervalData();
  constructor({
    interval,
    parallel = Infinity,
    perInterval
  }) {
    this.interval = interval;
    this.parallel = parallel;
    this.perInterval = perInterval;
  }
  getIntervalData() {
    const intervalData = this.intervalData;
    if (intervalData.startTime + this.interval <= performance.now()) {
      return this.updateIntervalData();
    }
    if (intervalData.executeCounte >= this.perInterval) {
      return this.updateIntervalData(intervalData.startTime + this.interval);
    }
    return intervalData;
  }
  updateIntervalData(time = performance.now()) {
    this.intervalData = {
      executeCounte: 0,
      startTime: time
    };
    return this.intervalData;
  }
  push(callback) {
    const lastIntervalData = this.getIntervalData();
    const promise = new Promise((resolve, reject) => {
      lastIntervalData.executeCounte += 1;
      setTimeout(async () => {
        try {
          const result = await callback();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, lastIntervalData.startTime - performance.now());
    });
    return promise;
  }
}
// src/string.ts
var CHAR_CODE = {
  a: 97,
  A: 65,
  z: 122,
  Z: 90
};
var isCharRange = (char, from, to) => {
  const charCode = char.codePointAt(0);
  return charCode && charCode >= from && charCode <= to;
};
var isUpperChar = (char) => isCharRange(char, CHAR_CODE.A, CHAR_CODE.Z);
var isLowerChar = (char) => isCharRange(char, CHAR_CODE.a, CHAR_CODE.z);
var capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
var IStringSeqType;
((IStringSeqType2) => {
  IStringSeqType2[IStringSeqType2["Number"] = 0] = "Number";
  IStringSeqType2[IStringSeqType2["Unknow"] = 1] = "Unknow";
  IStringSeqType2[IStringSeqType2["Lower"] = 2] = "Lower";
  IStringSeqType2[IStringSeqType2["Upper"] = 3] = "Upper";
})(IStringSeqType ||= {});
var getCharSeqType = (char) => {
  const charCode = char.codePointAt(0);
  if (charCode === undefined)
    return 1 /* Unknow */;
  if (charCode >= 97 && charCode <= 122)
    return 2 /* Lower */;
  if (charCode >= 65 && charCode <= 90)
    return 3 /* Upper */;
  if (charCode >= 48 && charCode <= 57)
    return 0 /* Number */;
  return 1 /* Unknow */;
};
var splitWords = (string) => {
  const result = [];
  for (const char of string) {
    const lastSeq = result.at(-1);
    const type = getCharSeqType(char);
    if (lastSeq) {
      if (lastSeq.type === type) {
        lastSeq.value += char;
      } else {
        result.push({
          type,
          value: char
        });
      }
    } else {
      result.push({
        type,
        value: char
      });
    }
  }
  return result;
  return result.filter(({ type }) => type !== 1 /* Unknow */);
};
var toKebabCase = (string) => {
  return splitWords(string).map(({ type, value }, id, arr) => {
    if (type === 1 /* Unknow */)
      return "";
    const prev = arr[id - 1];
    if (id === 0 || prev?.type === 3 /* Upper */) {
      return value.toLowerCase();
    }
    return "-" + value.toLowerCase();
  }).filter(Boolean).join("");
};
var toCamelCase = (string) => {
  return splitWords(string).map((seq, id, arr) => {
    if (seq.type === 1 /* Unknow */)
      return "";
    const prev = arr[id - 1];
    if (id > 0) {
      if (prev.type === 3 /* Upper */) {
        return seq.value.toLowerCase();
      }
      return capitalize(seq.value);
    }
    return seq.value.toLowerCase();
  }).join("");
};
var toUpperCase = (string) => {
  return splitWords(string).map((seq, id, arr) => {
    if (seq.type === 1 /* Unknow */)
      return "";
    const prev = arr[id - 1];
    if (prev) {
      if (prev.type === 3 /* Upper */) {
        return seq.value.toUpperCase();
      }
      return "_" + seq.value.toUpperCase();
    }
    return seq.value.toUpperCase();
  }).join("");
};
var toPascalCase = (string) => {
  return splitWords(string).map((seq, id, arr) => {
    if (seq.type === 1 /* Unknow */)
      return "";
    if (arr[id - 1] && arr[id - 1].type === 3 /* Upper */) {
      return seq.value;
    }
    return capitalize(seq.value);
  }).join("");
};
export {
  wait,
  updateById,
  toUpperCase,
  toPascalCase,
  toKebabCase,
  toCamelCase,
  toArray,
  throttle,
  sizeSplit,
  shallowMerge,
  shallowClone,
  serial,
  replace,
  optionalPath,
  ms,
  move,
  map,
  lastIndex,
  last,
  join,
  isUpperChar,
  isTextNode,
  isShallowEqual,
  isLowerChar,
  isExtends,
  isCharRange,
  getOptionalPath,
  getObjectSize,
  getConstructorName,
  formatBytes,
  flat,
  first,
  diff,
  deepMerge,
  deepClone,
  debounce,
  compose,
  capitalize,
  RateLimit,
  IStringSeqType,
  CHAR_CODE
};
