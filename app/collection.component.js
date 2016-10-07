"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var CollectionComponent = (function () {
    function CollectionComponent() {
        this.tabs = Tabs;
        this.selectedTab = Tabs.filter(function (a) { return a.isSelected == true; })[0];
        this.assetItems = Assets;
        this.isClassVisible = true;
        this.toggleButton = "Hide Collection";
    }
    /****************Drag and Drop Methods*******************/
    /********************************************************/
    CollectionComponent.prototype.dragAsset = function (ev, Dasset) {
        this.dragedAsset = Dasset;
    };
    CollectionComponent.prototype.dropAsset = function (ev) {
        var _this = this;
        if (this.dragedAsset != null) {
            if (this.selectedTab.Childs == null || this.selectedTab.Childs == undefined) {
                this.selectedTab.Childs = [];
                this.selectedTab.hasChilds = true;
                this.selectedTab.Childs.push(this.dragedAsset);
                this.selectedTab.coutnOfChilds = this.selectedTab.Childs.length;
            }
            else if (this.selectedTab.Childs.findIndex(function (a) { return a.id == _this.dragedAsset.id; }) == -1) {
                this.selectedTab.Childs.push(this.dragedAsset);
                this.selectedTab.coutnOfChilds = this.selectedTab.Childs.length;
            }
            else {
                var tabName = void 0;
                tabName = this.selectedTab.name;
                this.errMsg = "File with this name already exists in" + tabName;
                console.log("File with this name already exists in");
            }
        }
        this.dragedAsset = null;
        ev.preventDefault();
    };
    CollectionComponent.prototype.allowDrop = function (ev) {
        ev.preventDefault();
    };
    /******************** Click Methods **********************/
    /********************************************************/
    CollectionComponent.prototype.onCollectionClick = function (ev, STab) {
        this.errMsg = null;
        var prevTab;
        prevTab = this.tabs.filter(function (a) { return a.isSelected == true; })[0];
        if (prevTab != undefined && prevTab != null) {
            prevTab.isSelected = false;
        }
        STab.isSelected = true;
        this.selectedTab = STab;
    };
    CollectionComponent.prototype.Toggle = function () {
        this.isClassVisible = !this.isClassVisible;
        this.toggleButton = this.isClassVisible ? "Hide Collection" : "Show Collection";
    };
    CollectionComponent.prototype.btnDelete_clickHandler = function (ev, STab) {
        if (this.tabs.length > 1) {
            this.tabs = this.tabs.filter(function (el) { return el.id != STab.id; });
            this.tabs[0].isSelected = true;
            this.onCollectionClick(ev, this.tabs[0]);
        }
        else {
            this.openPopup(ev, STab);
            console.log("You may not have fewer than one collection");
        }
        this.TabtoDelete = null;
    };
    CollectionComponent.prototype.addCollection = function (ev) {
        if (this.tabs.length < 5) {
            var ids_1 = [];
            this.tabs.forEach(function (el) { ids_1.push(el.id); });
            var nxtTabid = this.getFirstSmallestMissingID(ids_1);
            this.tabs.push({ id: nxtTabid, Childs: null, hasChilds: false, isSelected: false, name: "Tab " + nxtTabid, coutnOfChilds: 0 });
            this.onCollectionClick(ev, this.tabs[this.tabs.length - 1]);
        }
    };
    CollectionComponent.prototype.onSelect = function (event) {
        alert("selected");
    };
    /********************** PopUp Methods ********************/
    /********************************************************/
    CollectionComponent.prototype.deleteCollection = function (ev, STab) {
        if (this.tabs.length > 1) {
            this.TabtoDelete = STab;
        }
        else {
            this.btnDelete_clickHandler(ev, STab);
        }
    };
    CollectionComponent.prototype.renameCollection = function (ev, reTab) {
        this.TabtoRename = reTab;
    };
    CollectionComponent.prototype.btnRename_clickHandler = function (ev) {
        this.TabtoRename = null;
    };
    CollectionComponent.prototype.btnCloseRename_clickHandler = function (ev) {
        this.TabtoRename = null;
    };
    CollectionComponent.prototype.btnCloseDelete_clickHandler = function (ev) {
        this.TabtoDelete = null;
    };
    CollectionComponent.prototype.openPopup = function (ev, tab) {
        this.TabtoRemain = tab;
    };
    CollectionComponent.prototype.closePopup = function (ev) {
        this.TabtoRemain = null;
    };
    /********************* Private Methods *******************/
    /********************************************************/
    CollectionComponent.prototype.getFirstSmallestMissingID = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var j = arr[i] - 1;
            while (j >= 0 && j < arr.length && arr[j] >= 0) {
                var temp = arr[j] - 1;
                arr[j] = -arr[j];
                if (arr[j] == 0)
                    arr[j] = -1;
                j = temp;
            }
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] >= 0) {
                return i + 1;
            }
        }
        return arr.length + 1;
    };
    CollectionComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/collection.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], CollectionComponent);
    return CollectionComponent;
}());
exports.CollectionComponent = CollectionComponent;
var Tab = (function () {
    function Tab() {
    }
    return Tab;
}());
exports.Tab = Tab;
var AssetItem = (function () {
    function AssetItem() {
    }
    return AssetItem;
}());
exports.AssetItem = AssetItem;
var Tabs = [
    { id: 1, name: 'Collection 1', isSelected: true, hasChilds: false, Childs: null, coutnOfChilds: 0 },
    { id: 2, name: 'Collection 2', isSelected: false, hasChilds: false, Childs: null, coutnOfChilds: 0 },
    { id: 3, name: 'Collection 3', isSelected: false, hasChilds: false, Childs: null, coutnOfChilds: 0 },
    { id: 4, name: 'Collection 4', isSelected: false, hasChilds: false, Childs: null, coutnOfChilds: 0 },
    { id: 5, name: 'Collection 5', isSelected: false, hasChilds: false, Childs: null, coutnOfChilds: 0 },
];
var Assets = [
    { id: 1, name: 'Asset 1', AssetImageURl: './images/asset.jpg' },
    { id: 2, name: 'Asset 2', AssetImageURl: './images/asset.jpg' },
    { id: 3, name: 'Asset 3', AssetImageURl: './images/asset.jpg' },
    { id: 4, name: 'Asset 4', AssetImageURl: './images/asset.jpg' },
    { id: 5, name: 'Asset 5', AssetImageURl: './images/asset.jpg' },
    { id: 6, name: 'Asset 5', AssetImageURl: './images/asset.jpg' },
    { id: 7, name: 'Asset 5', AssetImageURl: './images/asset.jpg' },
    { id: 8, name: 'Asset 5', AssetImageURl: './images/asset.jpg' },
    { id: 9, name: 'Asset 5', AssetImageURl: './images/asset.jpg' },
    { id: 10, name: 'Asset 5', AssetImageURl: './images/asset.jpg' },
    { id: 11, name: 'Asset 5', AssetImageURl: './images/asset.jpg' },
];
//# sourceMappingURL=collection.component.js.map