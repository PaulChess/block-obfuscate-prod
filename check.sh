#!/bin/bash
function init {
  distDirPath=$(find . -type d -wholename "*/dist")

  if [ ! -n "$distDirPath" ]; then
    echo "未检测到打包产物目录，检测通过!"
    exit
  fi

  # 获取 dist 目录下的所有 js 文件并将其包装成数组
  jsFilePaths=($(find $distDirPath -type f -name "*.js"))

  # 统计 dist 目录下 js 文件的个数
  jsFileCount=$(find $distDirPath -type f -name "*.js" | wc -l)

  # 获取采样文件个数
  if [ $jsFileCount -ge 5 ]; then
    echo "$distDirPath 目录中的 js 文件个数 >= 5"
    sampleFileCount=5
  else
    echo "$distDirPath 目录中的 js 文件个数 < 5"
    sampleFileCount=$jsFileCount
  fi

  echo "采样文件个数为: $sampleFileCount"
  echo "============"

  # 根据采样文件个数进行遍历
  echo "开始对采样文件进行检测..."
  echo "============"
  for(( i=0;i < $sampleFileCount;i=i+1))
  do
    filePath=${jsFilePaths[$i]}
    echo "采样文件 ${i}: $filePath"
    checkIsMinify $filePath
  done
}

function checkIsMinify {
  local filePath=$1
  echo "checkIsMinify==:$filePath"
}

init;



# 数组遍历
# arr=("$PWD/dir1" "$PWD/dir2" "$PWD/dir2")
# for d in "${arr[@]}"; do
#     if [ -d "$d"]; then
#         echo True
#     else
#         echo False
#     fi
# done