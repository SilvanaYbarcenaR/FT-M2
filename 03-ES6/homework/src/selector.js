const traverseDomAndCollectElements = function (matchFunctionMaker, startEl = document.body) {
  let resultSet = [];
  /* if (typeof startEl === "undefined") {
    startEl = document.body;
  } */

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien
  
  if(matchFunctionMaker(startEl)) resultSet.push(startEl);

  for(let i = 0; i < startEl.children.length; i++) {
    let aux = traverseDomAndCollectElements(matchFunctionMaker, startEl.children[i]);
    resultSet = [...resultSet, ...aux];
  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

const selectorTypeMatcher = function (selector) {
  if (selector[0] === "#") return "id"
  else if (selector[0] === ".") return "class"
  else if (selector.split(".").length > 1) return "tag.class"
  return "tag";
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

const matchFunctionMaker = function (selector) {
  const selectorType = selectorTypeMatcher(selector);
  let matchFunction;

  if (selectorType === "id") {
    matchFunction = (element) => `#${element.id}` === selector;
  } else if (selectorType === "class") {
    matchFunction = (element) => {
      let classes = element.classList;  // Array de clases
      return classes.contains(selector.slice(1))
    }
  } else if (selectorType === "tag.class") {
    matchFunction = (element) => {
      const [tagName, className] = selector.split(".");
      return matchFunctionMaker(tagName)(element) && matchFunctionMaker(`.${className}`)(element)
    }
  
  } else if (selectorType === "tag") {
    matchFunction = (element) => element.tagName.toLowerCase() === selector;
  }
  return matchFunction;
};

const $ = function (selector) {
  let elements;
  const selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
