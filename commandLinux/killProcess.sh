#!/bin/sh

# if [ $# -ne 2 ];
# then
#     echo "Invalid number of arguments"
#     exit 0
# fi
# while true;
# do
#     SIZE=$(pmap $1|grep total|grep -o "[0-9]*")
#     SIZE=${SIZE%%K*}
#     SIZEMB=$((SIZE/1024))
#     echo "Process Size = $SIZEMB MB"
#     if [ $SIZEMB -gt $2 ]; then
#         printf "SIZE has exceeded.\nKilling the process......"
#         kill -9 "$1"
#         echo "Killed the process"
#         exit 0
#     else
#         echo "SIZE has not yet exceeding"
#     fi
#     sleep 5
# done

# ps cax | grep node
# if [ $? -eq 0 ]; then
#   echo "Process is running."
# else
#   echo "Process is not running."
# fi



# pidof node
# if [ $? -eq 0 ]; then
#    echo 'si esta funci9onando'
# else
#     echo 'no esta funcionando'
# fi


while true;
do
    TOTAL=`cat /proc/meminfo | grep MemTotal: | awk '{print $2}'`
    USEDMEM=`cat /proc/meminfo | grep Active: | awk '{print $2}'`
    USEDMEMPER=$(($USEDMEM*100/$TOTAL))
    if [ $USEDMEMPER -gt '70' ]; then
        pidof phantomjs
        if [ $? -eq 0 ]; then
            pkill -f phantomjs
        else
            echo "Process is not running."
        fi
    else
        echo "memoria used $USEDMEMPER";
    fi
    sleep 5
done

# cat $LOG