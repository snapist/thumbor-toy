var React            = require('react/addons');
var Reflux           = require('reflux');
var config           = require('./../../../config');
var FiltersStore     = require('./../stores/FiltersStore');
var ImageStore       = require('./../stores/ImageStore');
var BrightnessFilter = require('./filters/BrightnessFilter.jsx');
var BlurFilter       = require('./filters/BlurFilter.jsx');
var GrayscaleFilter  = require('./filters/GrayscaleFilter.jsx');
var NoiseFilter      = require('./filters/NoiseFilter.jsx');

var Filters = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        return {
            filters: FiltersStore.all()
        };
    },

    componentWillMount: function () {
        this.listenTo(FiltersStore, this._onFiltersChange);
        this.listenTo(ImageStore,   this._onImageChange);
    },

    render: function () {
        return <div>
            <h3>Filters</h3>
            <BrightnessFilter filter={this.state.filters.brightness} />
            <BlurFilter filter={this.state.filters.blur} />
            <NoiseFilter filter={this.state.filters.noise} />
            <GrayscaleFilter filter={this.state.filters.grayscale} />
        </div>
    },

    _onImageChange: function () {
        console.log('img src', ImageStore.get());
    },

    _onFiltersChange: function () {
        this.setState({
            filters: FiltersStore.all()
        });
    }
});

module.exports = Filters;