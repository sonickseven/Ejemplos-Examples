//en este caso es con ffmpeg
for i in *.aac ; do 
    ffmpeg -i "$i" -acodec libmp3lame $(basename "${i/.aac}").mp3 
done
