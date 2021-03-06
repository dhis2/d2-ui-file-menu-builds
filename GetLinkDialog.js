'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogContentText = require('@material-ui/core/DialogContentText');

var _DialogContentText2 = _interopRequireDefault(_DialogContentText);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _d2I18n = require('@dhis2/d2-i18n');

var _d2I18n2 = _interopRequireDefault(_d2I18n);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAppUrl = function getAppUrl(fileType, fileId, context) {
    var baseUrl = context.d2.Api.getApi().baseUrl.split('/api', 1)[0];

    var appName = void 0;
    var appUrl = void 0;

    switch (fileType) {
        case 'chart':
        case 'visualization':
            appName = 'dhis-web-data-visualizer';
            appUrl = 'dhis-web-data-visualizer/#/' + fileId;
            break;
        case 'reportTable':
            appName = 'dhis-web-pivot';
            break;
        case 'eventReport':
            appName = 'dhis-web-event-reports';
            break;
        case 'eventChart':
            appName = 'dhis-web-event-visualizer';
            break;
        case 'map':
            appName = 'dhis-web-maps';
            break;
        default:
            appName = '';
    }

    // DHIS2-4253: force URL to be absolute
    var url = new URL(appUrl ? baseUrl + '/' + appUrl : baseUrl + '/' + appName + '/index.html?id=' + fileId, '' + window.location.origin + window.location.pathname);

    return url.href;
};

var GetLinkDialog = function GetLinkDialog(props, context) {
    var open = props.open,
        fileType = props.fileType,
        fileModel = props.fileModel,
        onRequestClose = props.onRequestClose;


    return _react2.default.createElement(
        _Dialog2.default,
        { open: open, onClose: onRequestClose, maxWidth: 'md' },
        _react2.default.createElement(
            _DialogContent2.default,
            null,
            _react2.default.createElement(
                _DialogContentText2.default,
                null,
                _d2I18n2.default.t('Open in this app'),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'a',
                    { href: getAppUrl(fileType, fileModel.id, context) },
                    getAppUrl(fileType, fileModel.id, context)
                )
            )
        ),
        _react2.default.createElement(
            _DialogActions2.default,
            null,
            _react2.default.createElement(
                _Button2.default,
                { onClick: onRequestClose, color: 'primary' },
                _d2I18n2.default.t('Close')
            )
        )
    );
};

GetLinkDialog.contextTypes = {
    d2: _propTypes2.default.object
};

GetLinkDialog.defaultProps = {
    open: false,
    fileModel: null,
    fileType: null,
    onRequestClose: null
};

GetLinkDialog.propTypes = {
    open: _propTypes2.default.bool,
    fileType: _propTypes2.default.oneOf(_util.supportedFileTypes),
    fileModel: _propTypes2.default.object,
    onRequestClose: _propTypes2.default.func
};

exports.default = GetLinkDialog;