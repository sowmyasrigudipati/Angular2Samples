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
    CollectionComponent.prototype.Dragstar = function (ev, Dasset) {
        this.dragedAsset = Dasset;
    };
    CollectionComponent.prototype.AssetDroped = function (ev) {
        var _this = this;
        if (this.dragedAsset != null) {
            if (this.selectedTab.Childs == null || this.selectedTab.Childs == undefined) {
                this.selectedTab.Childs = [];
                this.selectedTab.hasChilds = true;
                this.selectedTab.Childs.push(this.dragedAsset);
            }
            else if (this.selectedTab.Childs.findIndex(function (a) { return a.id == _this.dragedAsset.id; }) == -1) {
                this.selectedTab.Childs.push(this.dragedAsset);
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
    CollectionComponent.prototype.TabClick = function (ev, STab) {
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
    CollectionComponent.prototype.RemoveTab = function (ev, STab) {
        if (this.tabs.length > 1) {
            this.tabs = this.tabs.filter(function (el) { return el.id != STab.id; });
            this.tabs[0].isSelected = true;
            this.TabClick(ev, this.tabs[0]);
        }
        else {
            this.openPopup(ev, STab);
            console.log("You may not have fewer than one collection");
        }
        this.TabtoDelete = null;
    };
    CollectionComponent.prototype.AddTab = function (ev) {
        if (this.tabs.length < 5) {
            var ids_1 = [];
            this.tabs.forEach(function (el) { ids_1.push(el.id); });
            var nxtTabid = this.getFirstSmallestMissingID(ids_1);
            this.tabs.push({ id: nxtTabid, Childs: null, hasChilds: false, isSelected: false, name: "Tab " + nxtTabid });
            this.TabClick(ev, this.tabs[this.tabs.length - 1]);
        }
    };
    CollectionComponent.prototype.onSelect1 = function (event) {
        alert("selected");
        alert(event.target);
    };
    /********************** PopUp Methods ********************/
    /********************************************************/
    CollectionComponent.prototype.ConfirmDelete = function (ev, STab) {
        if (this.tabs.length > 1) {
            this.TabtoDelete = STab;
        }
        else {
            this.RemoveTab(ev, STab);
        }
    };
    CollectionComponent.prototype.RenameTab = function (ev, reTab) {
        this.TabtoRename = reTab;
    };
    CollectionComponent.prototype.RenameClose = function (ev) {
        this.TabtoRename = null;
    };
    CollectionComponent.prototype.ConfirmClose = function (ev) {
        this.TabtoDelete = null;
    };
    CollectionComponent.prototype.openPopup = function (ev, tab) {
        this.TabtoRemain = tab;
    };
    CollectionComponent.prototype.PopupClose = function (ev) {
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
            templateUrl: 'app/tabcomponent.html',
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
    { id: 1, name: 'Tab 1', isSelected: true, hasChilds: false, Childs: null },
    { id: 2, name: 'Tab 2', isSelected: false, hasChilds: false, Childs: null },
    { id: 3, name: 'Tab 3', isSelected: false, hasChilds: false, Childs: null },
    { id: 4, name: 'Tab 4', isSelected: false, hasChilds: false, Childs: null },
    { id: 5, name: 'Tab 5', isSelected: false, hasChilds: false, Childs: null },
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
//# sourceMappingURL=app.component.js.map