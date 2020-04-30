const path = require('path');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const { override, fixBabelImports, addWebpackAlias, addDecoratorsLegacy, addWebpackPlugin } = require('customize-cra');

// 跨域配置
const proxyApi = {
    '/api': {
        target: '',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api',
        },
    }
};

//生产环境去除console.* functions
const dropConsole = () => {
    return config => {
        if (config.optimization.minimizer) {
            config.optimization.minimizer.forEach(minimizer => {
                if (minimizer.constructor.name === 'TerserPlugin') {
                    minimizer.options.terserOptions.compress.drop_console = true
                }
            })
        }
        return config
    }
};


module.exports = {
    webpack: override(
        // antd配置
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css',
        }),
        // 添加别名
        addWebpackAlias({
            '@': path.resolve(__dirname, 'src/'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@views': path.resolve(__dirname, 'src/views'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@router': path.resolve(__dirname, 'src/router'),
            '@locales': path.resolve(__dirname, 'src/locales')
        }),
        // 删除console
        dropConsole(),
        // 启用底层修饰器babel
        addDecoratorsLegacy(),
        // 添加webpack插件
        addWebpackPlugin(
            new AntdDayjsWebpackPlugin()
        )
        
    ),
    devServer: configFunction => (proxy, allowedHost) => {
        proxy = process.env.NODE_ENV === 'development' ? proxyApi : null;
        const config = configFunction(proxy, allowedHost);
        return config;
      }
};