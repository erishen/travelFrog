## Start

1. Clone this repo.

2. Install dependencies.

        npm install
        npm install supervisor -g

3. Try these out.

    * `npm start` to develop with full live reload.
    * `npm run browsersync` is a alternative for development. It may be faster when modifying the express views
    (templates) only.
    * `npm run production` to emit outputs and run the express for production.
    * `npm run build` if you care about what is hold in memory for development...
    
4. URL list:
    * 映客视频随机播放: http://localhost:3000/inke?R
    * 映客视频单个播放: http://localhost:3000/inke?U=..&L=..
    * 天气按城市显示:   http://localhost:3000/seniverse?L=..
