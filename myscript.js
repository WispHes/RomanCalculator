const op = '+-*/';

const numRome = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
};

function calculator(string) {
  res = getResCalc(string);
  return res;
}

function getResCalc(string) {
  num = parsStr(string);

  sign = parsSign(num[1]);

  resNum = parsNum(num[0], num[2], sign);

  return resNum;
}

function parsStr(str) {
  items = str.split(' ');
  lenItems = items.length;
  if (lenItems == 3) {
    return items;
  }
  throw new Error(`expected len: 2; got: ${lenItems}`);
}

function parsSign(sign) {
  if (~op.indexOf(sign)) {
    return sign;
  }
  throw new Error(`expected: +, -, *, /; got: ${sign}`);
}

function parsNum(num, numLast, sign) {
  if (num < 11 && num > 0 && numLast > 0 && numLast < 11) {
    return mathOper(num, numLast, sign);
  } else if (num in numRome && numLast in numRome) {
    return mathOperRome(numRome[num], numRome[numLast], sign);
  }
  throw new Error(`unknown values: '${num}' and '${numLast}'`);
}

function mathOperRome(num, numLast, sign) {
  item = mathOper(num, numLast, sign);
  if (item < 0) {
    return ' ';
  }
  symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  result = '';
  for (i = 0; i < symbols.length; i++) {
    while (item >= values[i]) {
      result += symbols[i];
      item -= values[i];
    }
  }
  return result;
}

function mathOper(left, right, sign) {
  l = Number(left);
  r = Number(right);
  switch (sign) {
    case '+':
      return l + r;
    case '-':
      return l - r;
    case '/':
      return Math.floor(l / r);
    case '*':
      return l * r;
  }
}
