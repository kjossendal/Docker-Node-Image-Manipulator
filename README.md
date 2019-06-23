### Amazing Image Changer

This command line app scans for images in ./in folder,
and turns returns the manipulated images in ./out folder,
then exits.

the /in and /out file need to mounted as volumes, and can accept env vars so to run do something like this:

`docker build -t imager .`
`docker run -v $(pwd)/in:/app/in -v $(pwd)/out:/app/out --env WIDTH=250 HEIGHT=250 imager`
