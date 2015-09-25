/**
 * @Description: 压缩图片质量获得base64
 * @Author: wangjun
 * @Update: 2015-05-19 19:00
 * @version: 1.0
 * @Github URL: https://github.com/nevergiveup-j/canvas-resize-image
 */

;(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define([ "Zepto"], factory);
    } else {
        // 全局模式
        factory(Zepto);
    }

}(function ($) {
    "use strict";

    // 默认配置
    var defaults = {
        // 图片需要压缩的宽度，高度会跟随调整
        width: 640,
        // 压缩质量，不压缩为1
        quality: 0.8,
        // 图片大小 MB
        fileSize: 3,
        // 图片大小提示文字
        fileMessage: '图片不大于3MB',
        // 处理前函数 
        beforeCallback: function() {

        },
        // 成功回调
        successCallback: function() {

        }  
    };

    function ResizeIMG($this, options){

        this.$button = $($this);

        this.opts = $.extend(true, {}, defaults, options || {});
        this.orientation = null;

        this.init();
    };

    /**
     * 初始化
     */
    ResizeIMG.prototype.init = function(){
        this.bind();
    };

    /**
     * 事件绑定
     */
    ResizeIMG.prototype.bind = function() {
        var that = this,
            file, URL, blob;        

        this.$button.on('change', function(e){
            file = this.files[0];
            URL = window.URL || window.webkitURL;
            blob = URL.createObjectURL(file);

            // 上传前
            that.opts.beforeCallback && that.opts.beforeCallback(this, blob, file);

            // 图片大小MB
            if((file.size/1024/1024).toFixed(2) > that.opts.fileSize){
                // 生成结果
                var result = {
                    status: 401,
                    message: that.opts.fileMessage
                };

                that.opts.successCallback && that.opts.successCallback(result);
                return;
            }

            // 图片方向
            EXIF.getData(file, function(){
                that.orientation = EXIF.getTag(file, 'Orientation');
            });

            that.base64IMG(blob);

            // 清空临时数据
            this.value = '';
        })
    };

    /**
     * 生成base64
     */
    ResizeIMG.prototype.base64IMG = function(blob) {
        var that = this;        

        $('<img />')
            .on('load',function(){
                canvasURL(this, blob);
            })
            .error(function() {
                canvasURL(this, blob);
            })
            .attr('src', blob);        

        function canvasURL(self, blob) {
            // 生成比例
            var w = self.width,
                h = self.height,
                scale = w / h;

            // 上传图片宽度大于需要宽度
            if(w > that.opts.width){
                w = that.opts.width || w;
                h = w / scale;
            }

            //生成canvas
            var canvas = document.createElement('canvas');

            if(canvas.getContext) {
                var ctx = canvas.getContext('2d');
            }else{
                alert("对不起，您的浏览器不支持图片压缩及上传功能，请换个浏览器试试~");
                return;
            }

            $(canvas).attr({
                width: w,
                height: h
            });

            // 修正图片方向
            if(that.orientation){
                that.transformCoordinate(canvas, w, h, that.orientation);
            }

            ctx.drawImage(self, 0, 0, w, h);

            /**
             * 生成base64
             */
            var base64 = canvas.toDataURL('image/jpeg', that.opts.quality);

            // 修复IOS
            if (navigator.userAgent.match(/iphone/i)) {
                var mpImg = new MegaPixImage(blob);

                mpImg.render(canvas, {
                    maxWidth: w,
                    maxHeight: h,
                    quality: that.opts.quality
                });
                base64 = canvas.toDataURL('image/jpeg', that.opts.quality);
            }

            // 修复android
            if (navigator.userAgent.match(/Android/i)) {
                var encoder = new JPEGEncoder();
                base64 = encoder.encode(ctx.getImageData(0, 0, w, h), that.opts.quality * 100);
            }

            // 生成结果
            var result = {
                status: 200,
                data: {
                    base64: base64,
                    clearBase64: base64.substr(base64.indexOf(',') + 1)
                },
                message: '图片上传成功'
            }

            that.orientation = null;

            // 执行后函数
            that.opts.successCallback && that.opts.successCallback(result);
        }    
        
    };

    /**
     * 修正图片方向
     */
    ResizeIMG.prototype.transformCoordinate = function(canvas, width, height, orientation) {
        switch (orientation) {
            case 5:
            case 6:
            case 7:
            case 8:
                canvas.width = height;
                canvas.height = width;
                break;
            default:
                canvas.width = width;
                canvas.height = height;
        }
        
        var ctx = canvas.getContext('2d');
        switch (orientation) {
            case 1:
                // nothing
                break;
            case 2:
                // horizontal flip
                ctx.translate(width, 0);
                ctx.scale(-1, 1);
                break;
            case 3:
                // 180 rotate left
                ctx.translate(width, height);
                ctx.rotate(Math.PI);
                break;
            case 4:
                // vertical flip
                ctx.translate(0, height);
                ctx.scale(1, -1);
                break;
            case 5:
                // vertical flip + 90 rotate right
                ctx.rotate(0.5 * Math.PI);
                ctx.scale(1, -1);
                break;
            case 6:
                // 90 rotate right
                ctx.rotate(0.5 * Math.PI);
                ctx.translate(0, -height);
                break;
            case 7:
                // horizontal flip + 90 rotate right
                ctx.rotate(0.5 * Math.PI);
                ctx.translate(width, -height);
                ctx.scale(-1, 1);
                break;
            case 8:
                // 90 rotate left
                ctx.rotate(-0.5 * Math.PI);
                ctx.translate(-width, 0);
                break;
            default:
                break;
        }
        
    };


    $.fn.resizeIMG = function( options ) {
        return this.each(function() {
            new ResizeIMG( $(this), options );
        })
    };
    
    // ADM 
    return ResizeIMG;

}));    

