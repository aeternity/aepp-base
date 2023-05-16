#!/bin/bash
for name in default address aepp-base-invite
do
   ffmpeg -y -t 0.5 -loop 1 -framerate 5 -i $name.png -pix_fmt yuv420p -vf scale=600:600,noise=alls=70:allf=t+u $name.y4m
done
