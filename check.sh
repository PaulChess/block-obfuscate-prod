#!/bin/bash
function main {
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
  MAX_SAMPLE_FILE_COUNT=10
  if [ $jsFileCount -ge $MAX_SAMPLE_FILE_COUNT ]; then
    echo "$distDirPath 目录中的 js 文件个数 >= $MAX_SAMPLE_FILE_COUNT"
    sampleFileCount=$MAX_SAMPLE_FILE_COUNT
  else
    echo "$distDirPath 目录中的 js 文件个数 < $MAX_SAMPLE_FILE_COUNT"
    sampleFileCount=$jsFileCount
  fi

  echo "采样文件个数为: $sampleFileCount"
  echo "============"

  # 根据采样文件个数进行遍历检测
  echo "开始对采样文件进行检测..."
  echo "============"

  # 设置 IFS，防止采样文件中的空格影响行数的统计
  IFS=$'\n'

  # 1: 检测成功  0: 检测失败
  isCheckSuccess=1;

  for(( i=0;i < $sampleFileCount;i=i+1))
  do
    filePath=${jsFilePaths[$i]}
    isMinifyRes=$(checkIsMinify $filePath)

    if [ $isMinifyRes -eq 1 ]; then
      echo "采样文件 ${i}: $filePath 是压缩过的 js 文件，检测中断"
      isCheckSuccess=0
      break
    else
      echo "采样文件 ${i}: $filePath 采样通过"
    fi

    echo "************"
  done
  
  if [ $isCheckSuccess -eq 1 ]; then
    echo "未检测到打包产物，本次检测通过!"
    exit
  else
    echo "请检查仓库中是否有打包产物。若存在，请删除后重新执行检测!"
    exit -1
  fi
}

function checkIsMinify {
  local filePath=$1
  local kMaxNonMinifiedLength=500
  local isMinify=0
  for line in $(<$filePath);
  do
    currentLineCharacterNums="${#line}"
    if [ $currentLineCharacterNums -gt $kMaxNonMinifiedLength ]; then
      isMinify=1
      break
    fi
  done
  echo $[$isMinify]
}

main;
