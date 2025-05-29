"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/throw-expression/index.js
var require_throw_expression = __commonJS({
  "node_modules/throw-expression/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.throwIfFalsy = exports.throwIfUndefined = exports.throwIfNull = exports.Throw = void 0;
    exports.Throw = function(error) {
      if (typeof error === "string") {
        throw new Error(error);
      }
      throw error;
    };
    exports.throwIfNull = function(value, error) {
      if (error === void 0) {
        error = "value is null";
      }
      return value === null ? exports.Throw(error) : value;
    };
    exports.throwIfUndefined = function(value, error) {
      if (error === void 0) {
        error = "value is undefined";
      }
      return value === void 0 ? exports.Throw(error) : value;
    };
    exports.throwIfFalsy = function(value, error) {
      if (error === void 0) {
        error = "value is undefined";
      }
      return value === void 0 || value === null ? exports.Throw(error) : value;
    };
  }
});

// src/browser/css.ts
var css_exports = {};
__export(css_exports, {
  default: () => css_default
});
module.exports = __toCommonJS(css_exports);

// src/browser/common.ts
var isUi5 = () => typeof sap !== "undefined" && typeof sap.ui !== "undefined";
var Ui5SelectorEngineError = class extends Error {
  constructor(selector, error) {
    super(`ui5 selector engine failed on selector: "${selector}"

${String(error)}`);
  }
};

// node_modules/css-selector-parser/dist/mjs/indexes.js
var emptyMulticharIndex = {};
var emptyRegularIndex = {};
function extendIndex(item, index) {
  let currentIndex = index;
  for (let pos = 0; pos < item.length; pos++) {
    const isLast = pos === item.length - 1;
    const char = item.charAt(pos);
    const charIndex = currentIndex[char] || (currentIndex[char] = { chars: {} });
    if (isLast) {
      charIndex.self = item;
    }
    currentIndex = charIndex.chars;
  }
}
function createMulticharIndex(items) {
  if (items.length === 0) {
    return emptyMulticharIndex;
  }
  const index = {};
  for (const item of items) {
    extendIndex(item, index);
  }
  return index;
}
function createRegularIndex(items) {
  if (items.length === 0) {
    return emptyRegularIndex;
  }
  const result = {};
  for (const item of items) {
    result[item] = true;
  }
  return result;
}

// node_modules/css-selector-parser/dist/mjs/pseudo-class-signatures.js
var emptyPseudoClassSignatures = {};
var defaultPseudoClassSignature = {
  type: "String",
  optional: true
};
function calculatePseudoClassSignature(types) {
  const result = {
    optional: false
  };
  function setResultType(type) {
    if (result.type && result.type !== type) {
      throw new Error(`Conflicting pseudo-class argument type: "${result.type}" vs "${type}".`);
    }
    result.type = type;
  }
  for (const type of types) {
    if (type === "NoArgument") {
      result.optional = true;
    }
    if (type === "Formula") {
      setResultType("Formula");
    }
    if (type === "FormulaOfSelector") {
      setResultType("Formula");
      result.ofSelector = true;
    }
    if (type === "String") {
      setResultType("String");
    }
    if (type === "Selector") {
      setResultType("Selector");
    }
  }
  return result;
}
function inverseCategories(obj) {
  const result = {};
  for (const category of Object.keys(obj)) {
    const items = obj[category];
    if (items) {
      for (const item of items) {
        (result[item] || (result[item] = [])).push(category);
      }
    }
  }
  return result;
}
function calculatePseudoClassSignatures(definitions) {
  const pseudoClassesToArgumentTypes = inverseCategories(definitions);
  const result = {};
  for (const pseudoClass of Object.keys(pseudoClassesToArgumentTypes)) {
    const argumentTypes = pseudoClassesToArgumentTypes[pseudoClass];
    if (argumentTypes) {
      result[pseudoClass] = calculatePseudoClassSignature(argumentTypes);
    }
  }
  return result;
}

// node_modules/css-selector-parser/dist/mjs/syntax-definitions.js
var emptyXmlOptions = {};
var defaultXmlOptions = { wildcard: true };
function getXmlOptions(param) {
  if (param) {
    if (typeof param === "boolean") {
      return defaultXmlOptions;
    } else {
      return param;
    }
  } else {
    return emptyXmlOptions;
  }
}
function extendSyntaxDefinition(base, extension) {
  const result = { ...base };
  if ("tag" in extension) {
    if (extension.tag) {
      result.tag = { ...getXmlOptions(base.tag) };
      const extensionOptions = getXmlOptions(extension.tag);
      if ("wildcard" in extensionOptions) {
        result.tag.wildcard = extensionOptions.wildcard;
      }
    } else {
      result.tag = void 0;
    }
  }
  if ("ids" in extension) {
    result.ids = extension.ids;
  }
  if ("classNames" in extension) {
    result.classNames = extension.classNames;
  }
  if ("namespace" in extension) {
    if (extension.namespace) {
      result.namespace = { ...getXmlOptions(base.namespace) };
      const extensionOptions = getXmlOptions(extension.namespace);
      if ("wildcard" in extensionOptions) {
        result.namespace.wildcard = extensionOptions.wildcard;
      }
    } else {
      result.namespace = void 0;
    }
  }
  if ("combinators" in extension) {
    if (extension.combinators) {
      result.combinators = result.combinators ? result.combinators.concat(extension.combinators) : extension.combinators;
    } else {
      result.combinators = void 0;
    }
  }
  if ("attributes" in extension) {
    if (extension.attributes) {
      result.attributes = { ...base.attributes };
      if ("unknownCaseSensitivityModifiers" in extension.attributes) {
        result.attributes.unknownCaseSensitivityModifiers = extension.attributes.unknownCaseSensitivityModifiers;
      }
      if ("operators" in extension.attributes) {
        result.attributes.operators = extension.attributes.operators ? result.attributes.operators ? result.attributes.operators.concat(extension.attributes.operators) : extension.attributes.operators : void 0;
      }
      if ("caseSensitivityModifiers" in extension.attributes) {
        result.attributes.caseSensitivityModifiers = extension.attributes.caseSensitivityModifiers ? result.attributes.caseSensitivityModifiers ? result.attributes.caseSensitivityModifiers.concat(extension.attributes.caseSensitivityModifiers) : extension.attributes.caseSensitivityModifiers : void 0;
      }
    } else {
      result.attributes = void 0;
    }
  }
  if ("pseudoElements" in extension) {
    if (extension.pseudoElements) {
      result.pseudoElements = { ...base.pseudoElements };
      if ("unknown" in extension.pseudoElements) {
        result.pseudoElements.unknown = extension.pseudoElements.unknown;
      }
      if ("notation" in extension.pseudoElements) {
        result.pseudoElements.notation = extension.pseudoElements.notation;
      }
      if ("definitions" in extension.pseudoElements) {
        result.pseudoElements.definitions = extension.pseudoElements.definitions ? result.pseudoElements.definitions ? result.pseudoElements.definitions.concat(extension.pseudoElements.definitions) : extension.pseudoElements.definitions : void 0;
      }
    } else {
      result.pseudoElements = void 0;
    }
  }
  if ("pseudoClasses" in extension) {
    if (extension.pseudoClasses) {
      result.pseudoClasses = { ...base.pseudoClasses };
      if ("unknown" in extension.pseudoClasses) {
        result.pseudoClasses.unknown = extension.pseudoClasses.unknown;
      }
      if ("definitions" in extension.pseudoClasses) {
        const newDefinitions = extension.pseudoClasses.definitions;
        if (newDefinitions) {
          result.pseudoClasses.definitions = {
            ...result.pseudoClasses.definitions
          };
          const existingDefinitions = result.pseudoClasses.definitions;
          for (const key of Object.keys(newDefinitions)) {
            const newDefinitionForNotation = newDefinitions[key];
            const existingDefinitionForNotation = existingDefinitions[key];
            if (newDefinitionForNotation) {
              existingDefinitions[key] = existingDefinitionForNotation ? existingDefinitionForNotation.concat(newDefinitionForNotation) : newDefinitionForNotation;
            } else {
              existingDefinitions[key] = void 0;
            }
          }
        } else {
          result.pseudoClasses.definitions = void 0;
        }
      }
    } else {
      result.pseudoClasses = void 0;
    }
  }
  return result;
}
var css1SyntaxDefinition = {
  tag: {},
  ids: true,
  classNames: true,
  combinators: [],
  pseudoElements: {
    unknown: "reject",
    notation: "singleColon",
    definitions: ["first-letter", "first-line"]
  },
  pseudoClasses: {
    unknown: "reject",
    definitions: {
      NoArgument: ["link", "visited", "active"]
    }
  }
};
var css2SyntaxDefinition = extendSyntaxDefinition(css1SyntaxDefinition, {
  tag: { wildcard: true },
  combinators: [">", "+"],
  attributes: {
    unknownCaseSensitivityModifiers: "reject",
    operators: ["=", "~=", "|="]
  },
  pseudoElements: {
    definitions: ["before", "after"]
  },
  pseudoClasses: {
    unknown: "reject",
    definitions: {
      NoArgument: ["hover", "focus", "first-child"],
      String: ["lang"]
    }
  }
});
var selectors3SyntaxDefinition = extendSyntaxDefinition(css2SyntaxDefinition, {
  namespace: {
    wildcard: true
  },
  combinators: ["~"],
  attributes: {
    operators: ["^=", "$=", "*="]
  },
  pseudoElements: {
    notation: "both"
  },
  pseudoClasses: {
    definitions: {
      NoArgument: [
        "root",
        "last-child",
        "first-of-type",
        "last-of-type",
        "only-child",
        "only-of-type",
        "empty",
        "target",
        "enabled",
        "disabled",
        "checked",
        "indeterminate"
      ],
      Formula: ["nth-child", "nth-last-child", "nth-of-type", "nth-last-of-type"],
      Selector: ["not"]
    }
  }
});
var selectors4SyntaxDefinition = extendSyntaxDefinition(selectors3SyntaxDefinition, {
  combinators: ["||"],
  attributes: {
    caseSensitivityModifiers: ["i", "I", "s", "S"]
  },
  pseudoClasses: {
    definitions: {
      NoArgument: [
        "any-link",
        "local-link",
        "target-within",
        "scope",
        "current",
        "past",
        "future",
        "focus-within",
        "focus-visible",
        "read-write",
        "read-only",
        "placeholder-shown",
        "default",
        "valid",
        "invalid",
        "in-range",
        "out-of-range",
        "required",
        "optional",
        "blank",
        "user-invalid"
      ],
      Formula: ["nth-col", "nth-last-col"],
      String: ["dir"],
      FormulaOfSelector: ["nth-child", "nth-last-child"],
      Selector: ["current", "is", "where", "has"]
    }
  }
});
var progressiveSyntaxDefinition = extendSyntaxDefinition(selectors4SyntaxDefinition, {
  pseudoElements: {
    unknown: "accept"
  },
  pseudoClasses: {
    unknown: "accept"
  },
  attributes: {
    unknownCaseSensitivityModifiers: "accept"
  }
});
var cssSyntaxDefinitions = {
  css1: css1SyntaxDefinition,
  css2: css2SyntaxDefinition,
  css3: selectors3SyntaxDefinition,
  "selectors-3": selectors3SyntaxDefinition,
  "selectors-4": selectors4SyntaxDefinition,
  latest: selectors4SyntaxDefinition,
  progressive: progressiveSyntaxDefinition
};

// node_modules/css-selector-parser/dist/mjs/utils.js
function isIdentStart(c) {
  return c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c === "-" || c === "_";
}
function isIdent(c) {
  return c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "0" && c <= "9" || c === "-" || c === "_";
}
function isHex(c) {
  return c >= "a" && c <= "f" || c >= "A" && c <= "F" || c >= "0" && c <= "9";
}
var stringEscapeChars = {
  n: "\n",
  r: "\r",
  t: "	",
  f: "\f",
  "\\": "\\"
};
var whitespaceChars = {
  " ": true,
  "	": true,
  "\n": true,
  "\r": true,
  "\f": true
};
var quoteChars = {
  '"': true,
  "'": true
};
var digitsChars = {
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true
};

// node_modules/css-selector-parser/dist/mjs/parser.js
var errorPrefix = `css-selector-parser parse error: `;
function createParser(options = {}) {
  const { syntax = "latest", substitutes, strict = true } = options;
  let syntaxDefinition = typeof syntax === "string" ? cssSyntaxDefinitions[syntax] : syntax;
  if (syntaxDefinition.baseSyntax) {
    syntaxDefinition = extendSyntaxDefinition(cssSyntaxDefinitions[syntaxDefinition.baseSyntax], syntaxDefinition);
  }
  const [tagNameEnabled, tagNameWildcardEnabled] = syntaxDefinition.tag ? [true, Boolean(getXmlOptions(syntaxDefinition.tag).wildcard)] : [false, false];
  const idEnabled = Boolean(syntaxDefinition.ids);
  const classNamesEnabled = Boolean(syntaxDefinition.classNames);
  const namespaceEnabled = Boolean(syntaxDefinition.namespace);
  const namespaceWildcardEnabled = syntaxDefinition.namespace && (syntaxDefinition.namespace === true || syntaxDefinition.namespace.wildcard === true);
  if (namespaceEnabled && !tagNameEnabled) {
    throw new Error(`${errorPrefix}Namespaces cannot be enabled while tags are disabled.`);
  }
  const substitutesEnabled = Boolean(substitutes);
  const combinatorsIndex = syntaxDefinition.combinators ? createMulticharIndex(syntaxDefinition.combinators) : emptyMulticharIndex;
  const [attributesEnabled, attributesOperatorsIndex, attributesCaseSensitivityModifiers, attributesAcceptUnknownCaseSensitivityModifiers] = syntaxDefinition.attributes ? [
    true,
    syntaxDefinition.attributes.operators ? createMulticharIndex(syntaxDefinition.attributes.operators) : emptyMulticharIndex,
    syntaxDefinition.attributes.caseSensitivityModifiers ? createRegularIndex(syntaxDefinition.attributes.caseSensitivityModifiers) : emptyRegularIndex,
    syntaxDefinition.attributes.unknownCaseSensitivityModifiers === "accept"
  ] : [false, emptyMulticharIndex, emptyRegularIndex, false];
  const attributesCaseSensitivityModifiersEnabled = attributesAcceptUnknownCaseSensitivityModifiers || Object.keys(attributesCaseSensitivityModifiers).length > 0;
  const [pseudoClassesEnabled, paeudoClassesDefinitions, pseudoClassesAcceptUnknown] = syntaxDefinition.pseudoClasses ? [
    true,
    syntaxDefinition.pseudoClasses.definitions ? calculatePseudoClassSignatures(syntaxDefinition.pseudoClasses.definitions) : emptyPseudoClassSignatures,
    syntaxDefinition.pseudoClasses.unknown === "accept"
  ] : [false, emptyPseudoClassSignatures, false];
  const [pseudoElementsEnabled, pseudoElementsSingleColonNotationEnabled, pseudoElementsDoubleColonNotationEnabled, pseudoElementsIndex, pseudoElementsAcceptUnknown] = syntaxDefinition.pseudoElements ? [
    true,
    syntaxDefinition.pseudoElements.notation === "singleColon" || syntaxDefinition.pseudoElements.notation === "both",
    !syntaxDefinition.pseudoElements.notation || syntaxDefinition.pseudoElements.notation === "doubleColon" || syntaxDefinition.pseudoElements.notation === "both",
    syntaxDefinition.pseudoElements.definitions ? createRegularIndex(syntaxDefinition.pseudoElements.definitions) : emptyRegularIndex,
    syntaxDefinition.pseudoElements.unknown === "accept"
  ] : [false, false, false, emptyRegularIndex, false];
  let str = "";
  let l = str.length;
  let pos = 0;
  let chr = "";
  const is = (comparison) => chr === comparison;
  const isTagStart = () => is("*") || isIdentStart(chr) || is("\\");
  const rewind = (newPos) => {
    pos = newPos;
    chr = str.charAt(pos);
  };
  const next = () => {
    pos++;
    chr = str.charAt(pos);
  };
  const readAndNext = () => {
    const current = chr;
    pos++;
    chr = str.charAt(pos);
    return current;
  };
  function fail(errorMessage) {
    const position = Math.min(l - 1, pos);
    const error = new Error(`${errorPrefix}${errorMessage} Pos: ${position}.`);
    error.position = position;
    error.name = "ParserError";
    throw error;
  }
  function assert(condition, errorMessage) {
    if (!condition) {
      return fail(errorMessage);
    }
  }
  const assertNonEof = () => {
    assert(pos < l, "Unexpected end of input.");
  };
  const isEof = () => pos >= l;
  const pass = (character) => {
    assert(pos < l, `Expected "${character}" but end of input reached.`);
    assert(chr === character, `Expected "${character}" but "${chr}" found.`);
    pos++;
    chr = str.charAt(pos);
  };
  function matchMulticharIndex(index) {
    const match = matchMulticharIndexPos(index, pos);
    if (match) {
      pos += match.length;
      chr = str.charAt(pos);
      return match;
    }
  }
  function matchMulticharIndexPos(index, subPos) {
    const char = str.charAt(subPos);
    const charIndex = index[char];
    if (charIndex) {
      const subMatch = matchMulticharIndexPos(charIndex.chars, subPos + 1);
      if (subMatch) {
        return subMatch;
      }
      if (charIndex.self) {
        return charIndex.self;
      }
    }
  }
  function parseHex() {
    let hex = readAndNext();
    while (isHex(chr)) {
      hex += readAndNext();
    }
    if (is(" ")) {
      next();
    }
    return String.fromCharCode(parseInt(hex, 16));
  }
  function parseString(quote) {
    let result = "";
    pass(quote);
    while (pos < l) {
      if (is(quote)) {
        next();
        return result;
      } else if (is("\\")) {
        next();
        let esc;
        if (is(quote)) {
          result += quote;
        } else if ((esc = stringEscapeChars[chr]) !== void 0) {
          result += esc;
        } else if (isHex(chr)) {
          result += parseHex();
          continue;
        } else {
          result += chr;
        }
      } else {
        result += chr;
      }
      next();
    }
    return result;
  }
  function parseIdentifier() {
    let result = "";
    while (pos < l) {
      if (isIdent(chr)) {
        result += readAndNext();
      } else if (is("\\")) {
        next();
        assertNonEof();
        if (isHex(chr)) {
          result += parseHex();
        } else {
          result += readAndNext();
        }
      } else {
        return result;
      }
    }
    return result;
  }
  function parsePseudoClassString() {
    let result = "";
    while (pos < l) {
      if (is(")")) {
        break;
      } else if (is("\\")) {
        next();
        if (isEof() && !strict) {
          return (result + "\\").trim();
        }
        assertNonEof();
        if (isHex(chr)) {
          result += parseHex();
        } else {
          result += readAndNext();
        }
      } else {
        result += readAndNext();
      }
    }
    return result.trim();
  }
  function skipWhitespace() {
    while (whitespaceChars[chr]) {
      next();
    }
  }
  function parseSelector2(relative = false) {
    skipWhitespace();
    const rules = [parseRule(relative)];
    while (is(",")) {
      next();
      skipWhitespace();
      rules.push(parseRule(relative));
    }
    return {
      type: "Selector",
      rules
    };
  }
  function parseAttribute() {
    pass("[");
    skipWhitespace();
    let attr;
    if (is("|")) {
      assert(namespaceEnabled, "Namespaces are not enabled.");
      next();
      attr = {
        type: "Attribute",
        name: parseIdentifier(),
        namespace: { type: "NoNamespace" }
      };
    } else if (is("*")) {
      assert(namespaceEnabled, "Namespaces are not enabled.");
      assert(namespaceWildcardEnabled, "Wildcard namespace is not enabled.");
      next();
      pass("|");
      attr = {
        type: "Attribute",
        name: parseIdentifier(),
        namespace: { type: "WildcardNamespace" }
      };
    } else {
      const identifier = parseIdentifier();
      attr = {
        type: "Attribute",
        name: identifier
      };
      if (is("|")) {
        const savedPos = pos;
        next();
        if (isIdentStart(chr) || is("\\")) {
          assert(namespaceEnabled, "Namespaces are not enabled.");
          attr = {
            type: "Attribute",
            name: parseIdentifier(),
            namespace: { type: "NamespaceName", name: identifier }
          };
        } else {
          rewind(savedPos);
        }
      }
    }
    assert(attr.name, "Expected attribute name.");
    skipWhitespace();
    if (isEof() && !strict) {
      return attr;
    }
    if (is("]")) {
      next();
    } else {
      attr.operator = matchMulticharIndex(attributesOperatorsIndex);
      assert(attr.operator, "Expected a valid attribute selector operator.");
      skipWhitespace();
      assertNonEof();
      if (quoteChars[chr]) {
        attr.value = {
          type: "String",
          value: parseString(chr)
        };
      } else if (substitutesEnabled && is("$")) {
        next();
        attr.value = {
          type: "Substitution",
          name: parseIdentifier()
        };
        assert(attr.value.name, "Expected substitute name.");
      } else {
        attr.value = {
          type: "String",
          value: parseIdentifier()
        };
        assert(attr.value.value, "Expected attribute value.");
      }
      skipWhitespace();
      if (isEof() && !strict) {
        return attr;
      }
      if (!is("]")) {
        attr.caseSensitivityModifier = parseIdentifier();
        assert(attr.caseSensitivityModifier, "Expected end of attribute selector.");
        assert(attributesCaseSensitivityModifiersEnabled, "Attribute case sensitivity modifiers are not enabled.");
        assert(attributesAcceptUnknownCaseSensitivityModifiers || attributesCaseSensitivityModifiers[attr.caseSensitivityModifier], "Unknown attribute case sensitivity modifier.");
        skipWhitespace();
        if (isEof() && !strict) {
          return attr;
        }
      }
      pass("]");
    }
    return attr;
  }
  function parseNumber() {
    let result = "";
    while (digitsChars[chr]) {
      result += readAndNext();
    }
    assert(result !== "", "Formula parse error.");
    return parseInt(result);
  }
  const isNumberStart = () => is("-") || is("+") || digitsChars[chr];
  function parseFormula() {
    if (is("e") || is("o")) {
      const ident = parseIdentifier();
      if (ident === "even") {
        skipWhitespace();
        return [2, 0];
      }
      if (ident === "odd") {
        skipWhitespace();
        return [2, 1];
      }
    }
    let firstNumber = null;
    let firstNumberMultiplier = 1;
    if (is("-")) {
      next();
      firstNumberMultiplier = -1;
    }
    if (isNumberStart()) {
      if (is("+")) {
        next();
      }
      firstNumber = parseNumber();
      if (!is("\\") && !is("n")) {
        return [0, firstNumber * firstNumberMultiplier];
      }
    }
    if (firstNumber === null) {
      firstNumber = 1;
    }
    firstNumber *= firstNumberMultiplier;
    let identifier;
    if (is("\\")) {
      next();
      if (isHex(chr)) {
        identifier = parseHex();
      } else {
        identifier = readAndNext();
      }
    } else {
      identifier = readAndNext();
    }
    assert(identifier === "n", 'Formula parse error: expected "n".');
    skipWhitespace();
    if (is("+") || is("-")) {
      const sign = is("+") ? 1 : -1;
      next();
      skipWhitespace();
      return [firstNumber, sign * parseNumber()];
    } else {
      return [firstNumber, 0];
    }
  }
  function parsePseudoClass(pseudoName) {
    const pseudo = {
      type: "PseudoClass",
      name: pseudoName
    };
    let pseudoDefinition = paeudoClassesDefinitions[pseudoName];
    if (!pseudoDefinition && pseudoClassesAcceptUnknown) {
      pseudoDefinition = defaultPseudoClassSignature;
    }
    assert(pseudoDefinition, `Unknown pseudo-class: "${pseudoName}".`);
    pseudoDefinition = pseudoDefinition;
    if (is("(")) {
      next();
      skipWhitespace();
      if (substitutesEnabled && is("$")) {
        next();
        pseudo.argument = {
          type: "Substitution",
          name: parseIdentifier()
        };
        assert(pseudo.argument.name, "Expected substitute name.");
      } else if (pseudoDefinition.type === "String") {
        pseudo.argument = {
          type: "String",
          value: parsePseudoClassString()
        };
        assert(pseudo.argument.value, "Expected pseudo-class argument value.");
      } else if (pseudoDefinition.type === "Selector") {
        pseudo.argument = parseSelector2(true);
      } else if (pseudoDefinition.type === "Formula") {
        const [a, b] = parseFormula();
        pseudo.argument = {
          type: "Formula",
          a,
          b
        };
        if (pseudoDefinition.ofSelector) {
          skipWhitespace();
          if (is("o") || is("\\")) {
            const ident = parseIdentifier();
            assert(ident === "of", "Formula of selector parse error.");
            skipWhitespace();
            pseudo.argument = {
              type: "FormulaOfSelector",
              a,
              b,
              selector: parseRule()
            };
          }
        }
      } else {
        return fail("Invalid pseudo-class signature.");
      }
      skipWhitespace();
      if (isEof() && !strict) {
        return pseudo;
      }
      pass(")");
    } else {
      assert(pseudoDefinition.optional, `Argument is required for pseudo-class "${pseudoName}".`);
    }
    return pseudo;
  }
  function parseTagName() {
    if (is("*")) {
      assert(tagNameWildcardEnabled, "Wildcard tag name is not enabled.");
      next();
      return { type: "WildcardTag" };
    } else if (isIdentStart(chr) || is("\\")) {
      assert(tagNameEnabled, "Tag names are not enabled.");
      return {
        type: "TagName",
        name: parseIdentifier()
      };
    } else {
      return fail("Expected tag name.");
    }
  }
  function parseTagNameWithNamespace() {
    if (is("*")) {
      const savedPos = pos;
      next();
      if (!is("|")) {
        rewind(savedPos);
        return parseTagName();
      }
      next();
      if (!isTagStart()) {
        rewind(savedPos);
        return parseTagName();
      }
      assert(namespaceEnabled, "Namespaces are not enabled.");
      assert(namespaceWildcardEnabled, "Wildcard namespace is not enabled.");
      const tagName = parseTagName();
      tagName.namespace = { type: "WildcardNamespace" };
      return tagName;
    } else if (is("|")) {
      assert(namespaceEnabled, "Namespaces are not enabled.");
      next();
      const tagName = parseTagName();
      tagName.namespace = { type: "NoNamespace" };
      return tagName;
    } else if (isIdentStart(chr) || is("\\")) {
      const identifier = parseIdentifier();
      if (!is("|")) {
        assert(tagNameEnabled, "Tag names are not enabled.");
        return {
          type: "TagName",
          name: identifier
        };
      }
      const savedPos = pos;
      next();
      if (!isTagStart()) {
        rewind(savedPos);
        return {
          type: "TagName",
          name: identifier
        };
      }
      assert(namespaceEnabled, "Namespaces are not enabled.");
      const tagName = parseTagName();
      tagName.namespace = { type: "NamespaceName", name: identifier };
      return tagName;
    } else {
      return fail("Expected tag name.");
    }
  }
  function parseRule(relative = false) {
    const rule = {};
    let isRuleStart = true;
    if (relative) {
      const combinator = matchMulticharIndex(combinatorsIndex);
      if (combinator) {
        rule.combinator = combinator;
        skipWhitespace();
      }
    }
    while (pos < l) {
      if (isTagStart()) {
        assert(isRuleStart, "Unexpected tag/namespace start.");
        rule.tag = parseTagNameWithNamespace();
      } else if (is("|")) {
        const savedPos = pos;
        next();
        if (isTagStart()) {
          assert(isRuleStart, "Unexpected tag/namespace start.");
          rewind(savedPos);
          rule.tag = parseTagNameWithNamespace();
        } else {
          rewind(savedPos);
          break;
        }
      } else if (is(".")) {
        assert(classNamesEnabled, "Class names are not enabled.");
        next();
        const className = parseIdentifier();
        assert(className, "Expected class name.");
        (rule.classNames = rule.classNames || []).push(className);
      } else if (is("#")) {
        assert(idEnabled, "IDs are not enabled.");
        next();
        const idName = parseIdentifier();
        assert(idName, "Expected ID name.");
        (rule.ids = rule.ids || []).push(idName);
      } else if (is("[")) {
        assert(attributesEnabled, "Attributes are not enabled.");
        (rule.attributes = rule.attributes || []).push(parseAttribute());
      } else if (is(":")) {
        let isDoubleColon = false;
        let isPseudoElement = false;
        next();
        if (is(":")) {
          assert(pseudoElementsEnabled, "Pseudo elements are not enabled.");
          assert(pseudoElementsDoubleColonNotationEnabled, "Pseudo elements double colon notation is not enabled.");
          isDoubleColon = true;
          next();
        }
        const pseudoName = parseIdentifier();
        assert(isDoubleColon || pseudoName, "Expected pseudo-class name.");
        assert(!isDoubleColon || pseudoName, "Expected pseudo-element name.");
        assert(!isDoubleColon || pseudoElementsAcceptUnknown || pseudoElementsIndex[pseudoName], `Unknown pseudo-element "${pseudoName}".`);
        isPseudoElement = pseudoElementsEnabled && (isDoubleColon || !isDoubleColon && pseudoElementsSingleColonNotationEnabled && pseudoElementsIndex[pseudoName]);
        if (isPseudoElement) {
          rule.pseudoElement = pseudoName;
          if (!whitespaceChars[chr] && !is(",") && !is(")") && !isEof()) {
            return fail("Pseudo-element should be the last component of a CSS selector rule.");
          }
        } else {
          assert(pseudoClassesEnabled, "Pseudo classes are not enabled.");
          (rule.pseudoClasses = rule.pseudoClasses || []).push(parsePseudoClass(pseudoName));
        }
      } else {
        break;
      }
      isRuleStart = false;
    }
    if (isRuleStart) {
      if (isEof()) {
        return fail("Expected rule but end of input reached.");
      } else {
        return fail(`Expected rule but "${chr}" found.`);
      }
    }
    rule.type = "Rule";
    skipWhitespace();
    if (!isEof() && !is(",") && !is(")")) {
      const combinator = matchMulticharIndex(combinatorsIndex);
      skipWhitespace();
      rule.nestedRule = parseRule();
      rule.nestedRule.combinator = combinator;
    }
    return rule;
  }
  return (input) => {
    if (typeof input !== "string") {
      throw new Error(`${errorPrefix}Expected string input.`);
    }
    str = input;
    l = str.length;
    pos = 0;
    chr = str.charAt(0);
    return parseSelector2();
  };
}

// node_modules/css-selector-parser/dist/mjs/ast.js
function astMethods(type) {
  return (generatorName, checkerName) => ({
    [generatorName]: (props) => ({
      type,
      ...props
    }),
    [checkerName]: (entity) => typeof entity === "object" && entity !== null && entity.type === type
  });
}
var ast = {
  ...astMethods("Selector")("selector", "isSelector"),
  ...astMethods("Rule")("rule", "isRule"),
  ...astMethods("TagName")("tagName", "isTagName"),
  ...astMethods("WildcardTag")("wildcardTag", "isWildcardTag"),
  ...astMethods("NamespaceName")("namespaceName", "isNamespaceName"),
  ...astMethods("WildcardNamespace")("wildcardNamespace", "isWildcardNamespace"),
  ...astMethods("NoNamespace")("noNamespace", "isNoNamespace"),
  ...astMethods("Attribute")("attribute", "isAttribute"),
  ...astMethods("PseudoClass")("pseudoClass", "isPseudoClass"),
  ...astMethods("String")("string", "isString"),
  ...astMethods("Formula")("formula", "isFormula"),
  ...astMethods("FormulaOfSelector")("formulaOfSelector", "isFormulaOfSelector"),
  ...astMethods("Substitution")("substitution", "isSubstitution")
};

// src/browser/css.ts
var import_throw_expression = __toESM(require_throw_expression());
var getAllParents = (element) => {
  const getParents = (class_) => {
    const parent = class_.getParent();
    if (parent !== void 0) {
      return [class_, ...getParents(parent)];
    }
    return [class_];
  };
  return getParents(element.getMetadata()).map((parent) => parent.getName());
};
var parseSelector = (selector) => {
  if (selector === "") {
    throw new Error("ui5 selector is empty");
  }
  const parsedSelector = parse(selector);
  parsedSelector.rules.forEach((rule) => {
    if (rule.ids && rule.ids.length > 1) {
      throw new Error("multiple ids are not supported");
    }
    if (rule.pseudoElement === "subclass" && rule.tag?.type !== "TagName") {
      throw new Error(
        "subclass pseudo-selector cannot be used without specifying a control type"
      );
    }
  });
  return parsedSelector;
};
var parse = createParser({
  syntax: {
    combinators: [],
    namespace: false,
    attributes: { operators: ["=", "^=", "$=", "*=", "~=", "|="] },
    pseudoElements: { definitions: ["subclass"] },
    pseudoClasses: { definitions: { Selector: ["has"] } },
    tag: { wildcard: true },
    ids: true,
    classNames: true
  }
});
var querySelector = (root, selector) => selector.rules.flatMap((rule) => {
  if (rule.tag?.type === "TagName" && rule.classNames) {
    const sapNamespace = "sap";
    if (rule.tag.name !== sapNamespace) {
      rule.tag.name = `${sapNamespace}.${rule.tag.name}`;
    }
    rule.tag.name = [rule.tag.name, ...rule.classNames].join(".");
    delete rule.classNames;
  }
  const controls = sap.ui.core.Element?.registry.filter((element) => {
    if (rule.tag?.type === "TagName" && rule.tag.name !== element.getMetadata().getName() && (rule.pseudoElement !== "subclass" || !getAllParents(element).includes(rule.tag.name)) || rule.ids && rule.ids[0] !== element.getId()) {
      return false;
    }
    return (rule.attributes ?? []).every((attr) => {
      let actualValue;
      try {
        actualValue = String(element.getProperty(attr.name));
      } catch {
        return false;
      }
      if (!("value" in attr)) {
        return true;
      }
      const expectedValue = attr.value.value;
      return {
        "=": actualValue === expectedValue,
        "^=": actualValue.startsWith(expectedValue),
        "$=": actualValue.endsWith(expectedValue),
        "*=": actualValue.includes(expectedValue),
        "~=": actualValue.trim() === expectedValue,
        "|=": actualValue.split("-")[0] === expectedValue
      }[(0, import_throw_expression.throwIfUndefined)(
        attr.operator,
        "attribute operator was undefined when value was set (this should NEVER happen)"
      )];
    });
  }) ?? [];
  return controls.map((control) => control.getDomRef()).filter((element) => {
    if (element === null || root.querySelector(`[id='${element.id}']`) === null) {
      return false;
    }
    if (rule.pseudoClasses && querySelector(
      element,
      (0, import_throw_expression.throwIfUndefined)(
        rule.pseudoClasses[0],
        '":has" pseudo-class was specified without an argument'
      ).argument
    ).length === 0) {
      return false;
    }
    return true;
  });
});
var queryAll = (root, selector) => {
  try {
    const parsedSelector = parseSelector(selector);
    if (!isUi5()) {
      return [];
    }
    return querySelector(root, parsedSelector);
  } catch (e) {
    throw new Ui5SelectorEngineError(selector, e);
  }
};
var css_default = {
  queryAll,
  query: (root, selector) => queryAll(root, selector)[0]
};
