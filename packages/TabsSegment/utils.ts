/**
 * 判断是否是中文
 * @param str 需要判断的字符串
 * @return boolean
 */
const isChinese = (str: string) => {
  const req = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
  return req.test(str);
};

/**
 * 处理字符串长度（汉字2个， 其他1个）
 * @param str 需要处理的字符串
 * @return len 返回字符串长度
 */
export const getStrLength = (str: string) => {
  let len = 0;
  const realStr = str.trim();
  for (let i = 0; i < realStr.length; i++) {
    len += 1;
    if (isChinese(realStr[i])) {
      len += 1;
    }
  }
  return len;
};

/**
 * 内容处理，超过14个字符加省略号
 * @param str 传入需要处理的字符串
 * return 返回处理后的数据
 */
export const filterSegmentLabel = (str: string) => {
  const len = getStrLength(str);
  if (len > 14) {
    return `${str.slice(0, 7)}...`;
  }
  return str;
};
