/**
 * Created by medranomatias on 27/01/2017.
 */
(function(factory){
    "use strict";
    factory(Blz);
})(function(Blz){
    "use strict";
    const assign   = Object.assign;
    const resolve  = Promise.resolve;
    
    Blz.ns('Blz.controls');
    /**
     * @constructor
     * @param {Blz.controls.IGraphicsConstructor} config
     */
    Blz.controls.Graphics = function BlzControlsGraphics(config){
        "use strict";
        Blz.controls.Graphics.superclass.constructor.call(this, config)
    };

    Blz.extend(Blz.controls.Graphics, Blz.Panel, {
        /**
         * @override
         * @see {Blz.Component}
         */
        prefixId : 'blz-control-graphics',
        /**
         * @type {Function}
         * @public
         */
        asyncLoadConfig : null,
        /**
         * @type {String}
         * @public
         */
        loadUrl : null,
        /**
         * @type {{name : String, binding : String, required : Boolean, special : Object}[]}
         * @public
         */
        loadUrlParameters : [],
        /**
         * @type {Boolean}
         * @public
         */
        autoLoad : false,
        /**
         * @override
         * @see {Blz.Component}
         */
        processConfig(config){
            config.asyncLoadConfig = config.asyncLoad;
            delete config.asyncLoad;
            Blz.controls.Graphics.superclass.processConfig.call(this, config);
        },
        /**
         * @override
         * @see {Blz.Component}
         */
        internalPostRender(container){
            Blz.controls.Graphics.superclass.internalPostRender.call(this, container);            
            this.makeChart(this.config, this.config.type);
            if(this.autoLoad){
                setTimeout(() => this.asyncLoad(null, this.setValue.bind(this)), 1);
            }
            this.el.css({
                height : '100%'
            });
        },
        /**         
         * @param {[*]} data
         * @public
         * @method
         */
        setValue(data){
            //https://www.amcharts.com/docs/v4/concepts/data/#Setting_data
            this.__chart.data = data;            
            //this.__chart.invalidateData();
            //this.__chart.invalidateSize();
            return this;
        },
        /**
         * @returns {[*]}
         * @public
         * @method
         */
        getValue() {
            return this.__chart.data;
        },
        /**
         * @type {AmChart} config
         * @type {number} delay
         * @returns {Blz.controls.Graphics}
         * @protected
         * @method
         */
        makeChart(config, type) {
            //https://www.amcharts.com/docs/v4/concepts/responsive/
            //https://www.amcharts.com/docs/v4/concepts/json-config/            
            this.__chart = Blz.am4core.createFromConfig(assign({ responsive : { enabled: true } }, config), this.bodyEl.property("id"), type);
            this.__chart.invalidateData();    
            //this.__chart.invalidateSize();        
            return this;
        },
        /**
         * @type {null} reserved
         * @type {function(data: [*]):void } cb
         * @returns {Blz.controls.Graphics}
         * @method
         */
        asyncLoad(reserved, callback){
            const { controller : controller, name: name } = this;
            const { asyncLoadConfig: asyncLoadConfig } = this;
            if(controller[name + '_loadRecords']) {
                return Promise.resolve(controller[name + '_loadRecords']({})).then(callback);
            } else if(controller[name + '_asyncLoad']) {
                return resolve(controller[name + '_asyncLoad'](reserved, callback));
            } else if(asyncLoadConfig) {
                return resolve(asyncLoadConfig(reserved, callback));
            }
            return resolve(true);
        },  
        /**
         * @returns {Promise<true>}
         * @method
         * @public
         */
        refresh() {
            return this.asyncLoad((void 0), this.setValue.bind(this));            
        },


        beforeDestroy() {
            let chart = this.__chart;
            if(chart && chart.dispose){
                chart.dispose();
            }
        }
    });
    Blz.reg('AmChart', Blz.controls.Graphics);
});