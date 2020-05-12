#en este caso es con ffmpeg
for i in *.aac ; do 
    ffmpeg -i "$i" -acodec libmp3lame $(basename "${i/.aac}").mp3 
done

#escala todas las png a 720p
convert '*.png[720x]' resized%03d.png

#escala todas las png a jpg y les pone fondo blanco con calidad 90
convert '*.png[720x]' -quality 90 -background white -alpha remove -alpha off resized%03d.jpg

#escala todas las jpg a 720p y calidad 90
convert '*.jpg[720x]' -quality 90 resized%03d.jpg
