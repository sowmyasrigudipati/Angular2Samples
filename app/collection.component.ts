import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  templateUrl: 'app/collection.component.html',
})

export class CollectionComponent {
  dragedAsset: AssetItem;

  tabs = Tabs;
  selectedTab: Tab = Tabs.filter(a => a.isSelected == true)[0];
  TabtoDelete: Tab;
  TabtoRename: Tab;
  TabtoRemain: Tab;
  assetItems: AssetItem[] = Assets;
  errMsg: string;
  isClassVisible: boolean = true;
  toggleButton: string = "Hide Collection";

  NewName: string;
  showConfirm: boolean;


  /****************Drag and Drop Methods*******************/
  /********************************************************/

  dragAsset(ev, Dasset: AssetItem) {
    this.dragedAsset = Dasset;
  }

  dropAsset(ev) {
    if (this.dragedAsset != null) {
      if (this.selectedTab.Childs == null || this.selectedTab.Childs == undefined) {
        this.selectedTab.Childs = [];
        this.selectedTab.hasChilds = true;
        this.selectedTab.Childs.push(this.dragedAsset);
        this.selectedTab.coutnOfChilds = this.selectedTab.Childs.length;
      }
      else if (this.selectedTab.Childs.findIndex(a => a.id == this.dragedAsset.id) == -1) {
        this.selectedTab.Childs.push(this.dragedAsset);
        this.selectedTab.coutnOfChilds = this.selectedTab.Childs.length;
      }
      else {
        let tabName: string;
        tabName = this.selectedTab.name;
        this.errMsg = "File with this name already exists in" + tabName;
        console.log("File with this name already exists in");
      }
    }

    this.dragedAsset = null;
    ev.preventDefault();
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  /******************** Click Methods **********************/
  /********************************************************/

  onCollectionClick(ev, STab: Tab) {
    this.errMsg = null;
    let prevTab: Tab;
    prevTab = this.tabs.filter(a => a.isSelected == true)[0];

    if (prevTab != undefined && prevTab != null) {
      prevTab.isSelected = false;
    }
    STab.isSelected = true;
    this.selectedTab = STab;
  }
  Toggle() {
    this.isClassVisible = !this.isClassVisible;
    this.toggleButton = this.isClassVisible ? "Hide Collection" : "Show Collection";


  }
  btnDelete_clickHandler(ev, STab: Tab) {
    if (this.tabs.length > 1) {
      this.tabs = this.tabs.filter(function (el) { return el.id != STab.id });
      this.tabs[0].isSelected = true;
      this.onCollectionClick(ev, this.tabs[0]);
    }
    else {
      this.openPopup(ev, STab);
      console.log("You may not have fewer than one collection");
    }
    this.TabtoDelete = null;
  }

  addCollection(ev) {
    if (this.tabs.length < 5) {
      let ids: number[] = [];
      this.tabs.forEach(function (el) { ids.push(el.id) });
      let nxtTabid = this.getFirstSmallestMissingID(ids);

      this.tabs.push({ id: nxtTabid, Childs: null, hasChilds: false, isSelected: false, name: "Tab " + nxtTabid, coutnOfChilds: 0 })
      this.onCollectionClick(ev, this.tabs[this.tabs.length - 1]);
    }
  }

  onSelect(event) {
    alert("selected");
  }

  /********************** PopUp Methods ********************/
  /********************************************************/

  deleteCollection(ev, STab: Tab) {
    if (this.tabs.length > 1) {
      this.TabtoDelete = STab;
    } else {
      this.btnDelete_clickHandler(ev, STab);
    }
  }

  renameCollection(ev, reTab: Tab) {
    this.TabtoRename = reTab;
  }
  btnRename_clickHandler(ev) {
    this.TabtoRename = null;
  }
  btnCloseRename_clickHandler(ev) {
    this.TabtoRename = null;
  }

  btnCloseDelete_clickHandler(ev) {
    this.TabtoDelete = null;
  }

  openPopup(ev, tab: Tab) {
    this.TabtoRemain = tab;
  }
  closePopup(ev) {
    this.TabtoRemain = null;
  }

  /********************* Private Methods *******************/
  /********************************************************/
  private getFirstSmallestMissingID(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      let j = arr[i] - 1;

      while (j >= 0 && j < arr.length && arr[j] >= 0) {
        let temp = arr[j] - 1;
        arr[j] = -arr[j];
        if (arr[j] == 0)
          arr[j] = -1;
        j = temp;
      }
    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] >= 0) {
        return i + 1;
      }
    }
    return arr.length + 1;
  }

}

export class Tab {
  id: number;
  name: string;
  isSelected: boolean;
  Childs: AssetItem[];
  hasChilds: boolean;
  coutnOfChilds: number;
}

export class AssetItem {
  id: number;
  name: string;
  AssetImageURl: string;
}


const Tabs: Tab[] = [
  { id: 1, name: 'Collection 1', isSelected: true, hasChilds: false, Childs: null, coutnOfChilds: 0 },
  { id: 2, name: 'Collection 2', isSelected: false, hasChilds: false, Childs: null, coutnOfChilds: 0 },
  { id: 3, name: 'Collection 3', isSelected: false, hasChilds: false, Childs: null, coutnOfChilds: 0 },
  { id: 4, name: 'Collection 4', isSelected: false, hasChilds: false, Childs: null, coutnOfChilds: 0 },
  { id: 5, name: 'Collection 5', isSelected: false, hasChilds: false, Childs: null, coutnOfChilds: 0 },
];

const Assets: AssetItem[] = [
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


