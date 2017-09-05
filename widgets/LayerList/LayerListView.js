///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2016 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dijit/_WidgetBase',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/dom-construct',
    'dojo/dom',
  'dojo/on',
  'dojo/query',
  'jimu/dijit/CheckBox',
  'jimu/dijit/DropMenu',
  './PopupMenu',
  'dijit/_TemplatedMixin',
  'dojo/text!./LayerListView.html',
  'dojo/dom-class',
  'dojo/dom-style',
  './NlsStrings',
  'dijit/_AttachMixin',
  'dijit/Menu',
  'dijit/MenuItem',
  'dojo/domReady!',
  'dijit/registry',
  'dijit/form/CheckBox',
   'dojo/parser', 
    'dijit/form/ComboButton', 
    'dijit/DropDownMenu', 'dijit/MenuItem',
    './setting/LayerSelector',
    'dojo/topic'

], function(_WidgetBase, declare, lang, array, domConstruct, dom, on, query,
  CheckBox, DropMenu, PopupMenu, _TemplatedMixin, template,
  domClass, domStyle, NlsStrings, _AttachMixin, Menu, MenuItem, registry, ComboButton, LayerSelector, topic) {

  return declare([_WidgetBase, _TemplatedMixin, _AttachMixin], {
    templateString: template,
    _currentSelectedLayerRowNode: null,
    operationsDropMenu: null,
    operationsDropMenuForGroup: null,
    count: 0,
    layersInDetails:{},
    groupLayer:{},
      layers:[],
    finalGroup :[],
      button :null,
      layersArray : [],
      noOfClick :0,
      
    postMixInProperties: function() {
      this.inherited(arguments);
      this.nls = NlsStrings.value;
    },

    postCreate: function() {
            this.layersArray = this.operLayerInfos.getLayerInfoArray();
        var count = 0;
         array.forEach(this.operLayerInfos.getLayerInfoArray(), function(layerInfo, index) {
        if(layerInfo &&
         this.config.layerOptions &&
         this.config.layerOptions[layerInfo.id] !== undefined) {
          this.layersArray[count].groupname = this.config.layerOptions[layerInfo.id].groupname;
      } 
             count = count + 1;
         }, this);
        
//      array.forEach(this.operLayerInfos.getLayerInfoArray(), function(layerInfo, index) {
//          if(layersArray.length > index+1){
//              var nextLayer = layersArray[index+1];
//            if(layerInfo.title.substring(1, 7) == layersArray[index+1].title.substring(1, 7)){
//                this.layers = [];
//                layerInfo._visible = true;
//                layersArray[index+1]._visible = true;
//                this.layers.push(layerInfo);
//                this.layers.push(nextLayer);
//                count = count + 1;
//                this.groupLayer = nextLayer;
//                this.groupLayer.newSubLayers.push(layerInfo);
////                this.groupLayer = {
////                    "id" : index,
////                    "_visible": true,
////                    "title" : layersArray[index+1].title,
////                    "noLegend" : "",
////                    "isTable": false,
////                    "newSubLayers" : this.layers                  
////                }
//                
//               this.finalGroup.push(this.groupLayer);
//               // console.log(this.groupLayer)
//                this.drawListNode(this.groupLayer, 0, this.layerListTable, true);
//            }  
//          }
//         
//        
//      }, this);
        
        var tempGroupArray = [];
        //tempGroupArray.push(this.layersArray[0]);
        var groups = [];
        var tempGroupName = this.layersArray[0].groupname;
        groups[0] = this.layersArray[0].groupname;
        for (i = 0; i < this.layersArray.length; i++) {
            for (j = 0; j < groups.length; j++) {
             if(groups[j]  == this.layersArray[i].groupname){
               break; 
            }   
            else if(groups[j]  != this.layersArray[i].groupname){
                        tempGroupName = this.layersArray[i].groupname;
            }
                if(j==groups.length-1){
                    groups.push(tempGroupName);
                }
        }
            
        }
//             }, this);
//          }, this);
        for (l = 0; l < groups.length; l++) {
        array.forEach(this.layersArray, function(layerInfo, index) {
                if(groups[l]  == layerInfo.groupname){
                tempGroupArray.push(layerInfo);
            }
            if(index == this.layersArray.length-1){
                this.finalGroup.push({'title':groups[l],'newSubLayers':tempGroupArray,'id':groups[l],'layer':tempGroupArray[0]}); 
                tempGroupArray = [];
            }
          }, this);
            } 

        array.forEach(this.finalGroup, function(group) {
            group.isInScale = function(){
                return false;
            }
            this.drawListNode(group, 0, this.tableListTable, true);
            
//            group.createLegendsNode = function(){
//                return false;
//            }
            group.createLegendsNode = function(){
               var newDiv = document.createElement("div");
                newDiv.className = 'legends-div jimu-legends-div-flag jimu-leading-margin1';
                newDiv.legendsdivid =  'spaceManagementData_'+group.title;
                newDiv.style = 'font-size: 12px;';
               var newContent = document.createElement("img"); 
                newContent.className = 'legends-loading-img';
                newContent.src = '/webappbuilder/apps/2/jimu.js/images/loading.gif'
               newDiv.appendChild(newContent); //add the text node to the newly created div. 
                
//           var div =  domConstruct.create('div', {
//          'class': 'legends-div jimu-legends-div-flag jimu-leading-margin1',
//          'legendsdivid' : 'spaceManagementData_'+group.group,
//           'style':'font-size: 12px;'
//          'innerHTML': ''
//        }, );
  //    }
                
         return newDiv;
        }

       }, this);  
// --Previous Code
        
//         array.forEach(this.operLayerInfos.getLayerInfoArray(), function(layerInfo) {
//        this.drawListNode(layerInfo, 0, this.layerListTable, true);
//      }, this);    

        
//      array.forEach(this.operLayerInfos.getTableInfoArray(), function(layerInfo) {
//        this.drawListNode(layerInfo, 0, this.tableListTable, true);
//      }, this);
      this._initOperations();
    },
      
    drawListNode: function(layerInfo, level, toTableNode,isItGroup) {
      var nodeAndSubNode, showLegendDiv;
      if(this.isLayerHiddenInWidget(layerInfo)) {
//          console.log(layerInfo.title);
        return;
      }
      if (layerInfo.newSubLayers.length === 0) {
        //addLayerNode
        nodeAndSubNode = this.addLayerNode(layerInfo, level, toTableNode, false);
        //add legend node
        if (this.config.showLegend) {
          this.addLegendNode(layerInfo, level, nodeAndSubNode.subNode, false);
        } else {
          showLegendDiv = query(".showLegend-div", nodeAndSubNode.currentNode)[0];
          if(showLegendDiv) {
            domClass.add(showLegendDiv, 'hidden');
          }
        }
        return;
      }
      //addLayerNode
      nodeAndSubNode = this.addLayerNode(layerInfo, level, toTableNode);
      array.forEach(layerInfo.newSubLayers, lang.hitch(this, function(level, subLayerInfo) {
        this.drawListNode(subLayerInfo, level + 1, nodeAndSubNode.subNode,false);
      }, level));
    },

    addLayerNode: function(layerInfo, level, toTableNode,isItGroupName) {
        console.log("123--",layerInfo, level, toTableNode,isItGroupName);
       
        if(isItGroupName){
             var groupTitle = layerInfo.title;
        layerInfo = layerInfo.layers;
            layerInfo._visible = true;
            layerInfo.isTable = true;
            layerInfo.noLegend = false;
            layerInfo.title = groupTitle;
            layerInfo.isRootLayer = function(){
                return true;
            }
        }
//    console.log('LV--123',layerInfo);
      var layerTrNode = domConstruct.create('tr', {
          'class': 'jimu-widget-row layer-row ' +
            ( /*visible*/ false ? 'jimu-widget-row-selected' : ''),
          'layerTrNodeId': layerInfo.id
        }, toTableNode),
        layerTdNode, ckSelectDiv, ckSelect, imageNoLegendDiv,
        imageNoLegendNode, popupMenuNode, i, imageShowLegendDiv, popupMenu, divLabel;

    
        
      layerTdNode = domConstruct.create('td', {
        'class': 'col col1'
      }, layerTrNode);

      for (i = 0; i < level; i++) {
        domConstruct.create('div', {
          'class': 'begin-blank-div jimu-float-leading',
          'innerHTML': ''
        }, layerTdNode);
      }

      imageShowLegendDiv = domConstruct.create('div', {
        'class': 'showLegend-div jimu-float-leading',
        'imageShowLegendDivId': layerInfo.id
      }, layerTdNode);

      ckSelectDiv = domConstruct.create('div', {
        'class': 'div-select jimu-float-leading'
      }, layerTdNode);

       console.log("123",layerInfo._visible);
        if(layerInfo._visible == undefined){
            layerInfo._visible = true;
        }
      ckSelect = new CheckBox({
        checked: layerInfo._visible , // //layerInfo.isVisible()
        'class': "visible-checkbox-" + layerInfo.id
      });

      domConstruct.place(ckSelect.domNode, ckSelectDiv);

      imageNoLegendDiv = domConstruct.create('div', {
        'class': 'noLegend-div jimu-float-leading'
      }, layerTdNode);
        
      var imageName;
      if (layerInfo.isTable) {
        imageName = 'images/table.png';
      } else {
        imageName = 'images/noLegend.png';
      }

      imageNoLegendNode = domConstruct.create('img', {
        'class': 'noLegend-image',
        'src': this.layerListWidget.folderUrl + imageName,
        'alt': 'l'
      }, imageNoLegendDiv);

      if (layerInfo.noLegend || layerInfo.isTable) {
        domStyle.set(imageShowLegendDiv, 'display', 'none');
        domStyle.set(ckSelectDiv, 'display', 'none');
        domStyle.set(imageNoLegendDiv, 'display', 'block');
      }

      // set tdNode width
      domStyle.set(layerTdNode, 'width', level * 12 + 40 + 'px');

      var layerTitleTdNode = domConstruct.create('td', {
        'class': 'col col2'
      }, layerTrNode);

      var grayedTitleClass = '';
      try {
        if (!layerInfo.isInScale()) {
          grayedTitleClass = 'grayed-title';
        }
      } catch (err) {
        console.warn(err.message);
      }
      var layerTitleDivIdClass = 'layer-title-div-' + layerInfo.id;
//        console.log(layerInfo.title);
      divLabel = domConstruct.create('div', {
        'innerHTML': layerInfo.title,
        'class':layerTitleDivIdClass + ' div-content jimu-float-leading ' + grayedTitleClass
      }, layerTitleTdNode);

      //domStyle.set(divLabel, 'width', 263 - level*13 + 'px');

      layerTdNode = domConstruct.create('td', {
        'class': 'col col3'
      }, layerTrNode);

      // add popupMenu
      popupMenuNode = domConstruct.create('div', {
        'class': 'layers-list-popupMenu-div'
      }, layerTdNode);

      popupMenu = new PopupMenu({
        //items: layerInfo.popupMenuInfo.menuItems,
        _layerInfo: layerInfo,
        box: this.layerListWidget.domNode.parentNode,
        popupMenuNode: popupMenuNode,
        layerListWidget: this.layerListWidget,
        _config: this.config
      }).placeAt(popupMenuNode);
      this.own(on(popupMenu,
        'onMenuClick',
        lang.hitch(this, this._onPopupMenuItemClick, layerInfo, popupMenu)));
        
      //add a tr node to toTableNode.
      var trNode = domConstruct.create('tr', {
        'class': '',
        'layerContentTrNodeId': layerInfo.id
      }, toTableNode);

      var tdNode = domConstruct.create('td', {
        'class': '',
        'colspan': '3'
      }, trNode);

      var tableNode = domConstruct.create('table', {
        'class': 'layer-sub-node',
        'subNodeId': layerInfo.id,
          'id':layerInfo.id
      }, tdNode);

      //bind event
      this.own(on(layerTitleTdNode,
        'click',
        lang.hitch(this,
          this._onRowTrClick,
          layerInfo,
          imageShowLegendDiv,
          layerTrNode,
          tableNode)));

      this.own(on(imageShowLegendDiv,
        'click',
        lang.hitch(this,
          this._onRowTrClick,
          layerInfo,
          imageShowLegendDiv,
          layerTrNode,
          tableNode,
          isItGroupName)));

      this.own(on(layerTrNode,
        'mouseover',
        lang.hitch(this, this._onLayerNodeMouseover, layerTrNode, popupMenu)));
      this.own(on(layerTrNode,
        'mouseout',
        lang.hitch(this, this._onLayerNodeMouseout, layerTrNode, popupMenu)));
      this.own(on(ckSelect.domNode, 'click', lang.hitch(this,
        this._onCkSelectNodeClick,
        layerInfo,
        ckSelect)));

      this.own(on(popupMenuNode, 'click', lang.hitch(this,
        this._onPopupMenuClick,
        layerInfo,
        popupMenu,
        layerTrNode)));

      return {
        currentNode: layerTrNode,
        subNode: tableNode
      };
    },

    addLegendNode: function(layerInfo, level, toTableNode, isItGroupName) {
        
      //var legendsDiv;
      var legendTrNode = domConstruct.create('tr', {
          'class': 'legend-node-tr'
        }, toTableNode),
        legendTdNode;

      legendTdNode = domConstruct.create('td', {
        'class': 'legend-node-td'
      }, legendTrNode);

      try {
          if(layerInfo.createLegendsNode != "false" || layerInfo.createLegendsNode != false ){
        var legendsNode = layerInfo.createLegendsNode();
        //layerInfo.legendsNode = legendsNode;
        //domStyle.set(legendsNode, 'marginLeft', (level+1)*12 + 'px');
        domStyle.set(legendsNode, 'font-size', (level + 1) * 12 + 'px');
        domConstruct.place(legendsNode, legendTdNode);
              }
      } catch (err) {
        console.error(err);
      }
    },

    // return current state:
    //   true:  fold,
    //   false: unfold
    _foldSwitch: function(layerInfo, imageShowLegendDiv, subNode) {
      /*jshint unused: false*/
      var state;
      if (domStyle.get(subNode, 'display') === 'none') {
        state = this._foldOrUnfoldLayer(layerInfo, false, imageShowLegendDiv, subNode);
      } else {
        state = this._foldOrUnfoldLayer(layerInfo, true, imageShowLegendDiv, subNode);
      }
      return state;
    },

    _foldOrUnfoldLayer: function(layerInfo, isFold, imageShowLegendDivParam, subNodeParam) {
      var imageShowLegendDiv =
        imageShowLegendDiv ?
        imageShowLegendDivParam :
        query("div[imageShowLegendDivId='" + layerInfo.id + "']", this.layerListTable)[0];
      var subNode =
        subNode ?
        subNodeParam :
        query("table[subNodeId='" + layerInfo.id + "']", this.layerListTable)[0];

      var state = null;
      if(imageShowLegendDiv && subNode) {
        if (isFold) {
          //fold
          domStyle.set(subNode, 'display', 'none');
          domClass.remove(imageShowLegendDiv, 'unfold');
          state = true;
        } else {
          //unfold
          domStyle.set(subNode, 'display', 'table');
          domClass.add(imageShowLegendDiv, 'unfold');
          state = false;
          if (layerInfo.isLeaf()) {
            var legendsNode = query(".legends-div", subNode)[0];
            var loadingImg = query(".legends-loading-img", legendsNode)[0];
            if (legendsNode && loadingImg) {
              layerInfo.drawLegends(legendsNode, this.layerListWidget.appConfig.portalUrl);
            }
          }
        }
      }
      return state;
    },

    redrawLegends: function(layerInfo) {
      var legendsNode = query("div[legendsDivId='" + layerInfo.id + "']", this.layerListTable)[0];
      if(legendsNode) {
        if(legendsNode._legendDijit && legendsNode._legendDijit.destroy) {
          legendsNode._legendDijit.destroy();
        }
        layerInfo.drawLegends(legendsNode, this.layerListWidget.appConfig.portalUrl);
      }
    },

    _foldOrUnfoldLayers: function(layerInfos, isFold) {
      array.forEach(layerInfos, function(layerInfo) {
        this._foldOrUnfoldLayer(layerInfo, isFold);
      }, this);
    },

    _onCkSelectNodeClick: function(layerInfo, ckSelect, evt) {
      if(evt.ctrlKey || evt.metaKey) {
        if(layerInfo.isRootLayer()) {
          this.turnAllRootLayers(ckSelect.checked);
        } else {
          this.turnAllSameLevelLayers(layerInfo, ckSelect.checked);
        }
      } else {
        layerInfo.setTopLayerVisible(ckSelect.checked);
      }
      evt.stopPropagation();
    },

    _onPopupMenuClick: function(layerInfo, popupMenu, layerTrNode, evt) {
      /*jshint unused: false*/
      this._changeSelectedLayerRow(layerTrNode);
      if (popupMenu && popupMenu.state === 'opened') {
        popupMenu.closeDropMenu();
      } else {
        this._hideCurrentPopupMenu();
        if (popupMenu) {
          this.currentPopupMenu = popupMenu;
          popupMenu.openDropMenu();
        }
      }

      //hidden operation mene if that is opened.
      if (this.operationsDropMenu && this.operationsDropMenu.state === 'opened') {
        this.operationsDropMenu.closeDropMenu();
      }
      evt.stopPropagation();
    },

    _hideCurrentPopupMenu: function() {
      if (this.currentPopupMenu && this.currentPopupMenu.state === 'opened') {
        this.currentPopupMenu.closeDropMenu();
      }
    },

    _onLayerNodeMouseover: function(layerTrNode) {
      domClass.add(layerTrNode, "layer-row-mouseover");
      /*
      if (popupMenu) {
        //domClass.add(popupMenuNode, "layers-list-popupMenu-div-selected");
        domClass.add(popupMenu.btnNode, "jimu-icon-btn-selected");
      }
      */
    },

    _onLayerNodeMouseout: function(layerTrNode) {
      domClass.remove(layerTrNode, "layer-row-mouseover");
      /*
      if (popupMenu) {
        //domClass.remove(popupMenuNode, "layers-list-popupMenu-div-selected");
        domClass.remove(popupMenu.btnNode, "jimu-icon-btn-selected");
      }
      */
    },

    _onLayerListWidgetPaneClick: function() {
      if (this.operationsDropMenu) {
        this.operationsDropMenu.closeDropMenu();
      }
    },

    _onRowTrClick: function(layerInfo, imageShowLegendDiv, layerTrNode, subNode, evt, isitGroupName) {
        this.noOfClick = this.noOfClick + 1;
        this.turnAllRootLayers(true);
        if(isitGroupName ){
            evt ={'ctrlKey' : false ,'metaKey':false};
        if(this.noOfClick % 2==0){   
             document.getElementById(layerInfo.title).style.display = "block";
        }
        else{
             document.getElementById(layerInfo.title).style.display = "none";
        }
      }
      this._changeSelectedLayerRow(layerTrNode);
      var fold = this._foldSwitch(layerInfo, imageShowLegendDiv, subNode);
      if(evt.ctrlKey || evt.metaKey) {
        if(layerInfo.isRootLayer()) {
          this.foldOrUnfoldAllRootLayers(fold);
        } else {
          this.foldOrUnfoldSameLevelLayers(layerInfo, fold);
        }
      }
    },

    _changeSelectedLayerRow: function(layerTrNode) {
        console.log("1111",this._currentSelectedLayerRowNode,layerTrNode);
      if (this._currentSelectedLayerRowNode && this._currentSelectedLayerRowNode === layerTrNode) {
        return;
      }
      if (this._currentSelectedLayerRowNode) {
        domClass.remove(this._currentSelectedLayerRowNode, 'jimu-widget-row-selected');
      }
      domClass.add(layerTrNode, 'jimu-widget-row-selected');
      this._currentSelectedLayerRowNode = layerTrNode;
    },

    _onPopupMenuItemClick: function(layerInfo, popupMenu, item, data) {
      var evt = {
          itemKey: item.key,
          extraData: data,
          layerListWidget: this.layerListWidget,
          layerListView: this
        },
        result;

      // window.jimuNls.layerInfosMenu.itemTransparency NlsStrings.value.itemTransparency
      if (item.key === 'transparency') {
        if (domStyle.get(popupMenu.transparencyDiv, 'display') === 'none') {
          popupMenu.showTransNode(layerInfo.getOpacity());
        } else {
          popupMenu.hideTransNode();
        }
      } else {
        result = popupMenu.popupMenuInfo.onPopupMenuClick(evt);
        if (result.closeMenu) {
          popupMenu.closeDropMenu();
        }
      }
    },

    // befor exchange:  id1 -> id2
    // after exchanged: id2 -> id1
    _exchangeLayerTrNode: function(layerInfo1, layerInfo2) {
      var layer1TrNode = query("tr[layerTrNodeId='" + layerInfo1.id + "']", this.layerListTable)[0];
      //var layer1ContentTrNode = query("tr[layerContentTrNodeId='" + layerInfo1.id + "']",
      //                                this.layerListTable)[0];
      var layer2TrNode = query("tr[layerTrNodeId='" + layerInfo2.id + "']", this.layerListTable)[0];
      var layer2ContentTrNode = query("tr[layerContentTrNodeId='" + layerInfo2.id + "']",
        this.layerListTable)[0];
      if(layer1TrNode && layer2TrNode && layer2ContentTrNode) {
        // change layerTr
        this.layerListTable.removeChild(layer2TrNode);
        this.layerListTable.insertBefore(layer2TrNode, layer1TrNode);
        // change LayerContentTr
        this.layerListTable.removeChild(layer2ContentTrNode);
        this.layerListTable.insertBefore(layer2ContentTrNode, layer1TrNode);
      }
    },


    _getMovedSteps: function(layerInfo, upOrDown) {
      // summary:
      //   according to hidden layers to get moved steps.
      var steps = 1;
      var layerInfoIndex;
      var layerInfoArray = this.operLayerInfos.getLayerInfoArray();
      array.forEach(layerInfoArray, function(currentLayerInfo, index) {
        if(layerInfo.id === currentLayerInfo.id) {
          layerInfoIndex = index;
        }
      }, this);
      if(upOrDown === "moveup") {
        while(!layerInfoArray[layerInfoIndex].isFirst) {
          layerInfoIndex--;
          if(this.isLayerHiddenInWidget(layerInfoArray[layerInfoIndex]) &&
              !layerInfoArray[layerInfoIndex].isFirst) {
            steps++;
          } else {
            break;
          }
        }
      } else {
        while(!layerInfoArray[layerInfoIndex].isLast) {
          layerInfoIndex++;
          if(this.isLayerHiddenInWidget(layerInfoArray[layerInfoIndex]) &&
              !layerInfoArray[layerInfoIndex].isLast) {
            steps++;
          } else {
            break;
          }
        }
      }
      return steps;
    },

    _initOperations: function() {
      this.operationsDropMenu = new DropMenu({
        items:[{
          key: "turnAllLayersOn",
          label: this.nls.turnAllLayersOn
        }, {
          key: "turnAllLayersOff",
          label: this.nls.turnAllLayersOff
        }, {
          key: "separator"
        }, {
          key: "expandAllLayers",
          label: this.nls.expandAllLayers
        }, {
          key: "collapseAlllayers",
          label: this.nls.collapseAlllayers
        }],
        box: this.layerListWidget.domNode.parentNode
      }).placeAt(this.layerListOperations);
       
        
    // this.comboButtonMenu(this.finalGroup);
    var groupArray = [];
      array.forEach(this.finalGroup, function(layerInfo, index) {
          var item = {key:layerInfo.title,
                     label:layerInfo.title};
          groupArray.push(item);
          
      },this);
        
//     this.operationsDropMenuForGroup = new DropMenu({
//        items:groupArray,
//        box: this.layerListWidget.domNode
//      }).placeAt(this.layerListOperationsForGroup);

        
      var operationIconBtnNode = query('div.jimu-dropmenu > div:first-child',
          this.layerListOperations)[0];
//      var operationIconBtnNodeForGroup = query('div.jimu-dropmenu',
//          this.layerListOperationsForGroup)[0];
      if(operationIconBtnNode) {
        domClass.remove(operationIconBtnNode, ['jimu-icon-btn', 'popup-menu-button']);
        domClass.add(operationIconBtnNode, ['feature-action', 'icon-operation']);
       
      }
        
//        if(operationIconBtnNodeForGroup) {
//          domClass.remove(operationIconBtnNodeForGroup, ['jimu-icon-btn', 'popup-menu-button']);
//        domClass.add(operationIconBtnNodeForGroup, ['feature-action', 'icon-operation']);
//        }
       // console.log(this.operationsDropMenuForGroup.btnNode)
      if(this.operationsDropMenu.btnNode) {
        this.own(on(this.operationsDropMenu.btnNode,
          'click',
          lang.hitch(this, this._onLayerListOperationsClick)));
      }
//    if(this.operationsDropMenuForGroup.btnNode) {
//        this.own(on(this.operationsDropMenuForGroup.btnNode,
//          'click',
//          lang.hitch(this, this._onLayerListOperationsClick)));
//      }

      this.own(on(this.operationsDropMenu ,
        'onMenuClick',
        lang.hitch(this, this._onOperationsMenuItemClick)));
        
//    this.own(on(this.operationsDropMenuForGroup ,
//        'onMenuClick',
//        lang.hitch(this, this._onOperationsMenuItemClickForGroup)));
//        

    },

    _onLayerListOperationsClick: function() {
      this._hideCurrentPopupMenu();
    },

    _onOperationsMenuItemClick: function(item) {
      switch (item.key) {
      case 'turnAllLayersOn':
        this.turnAllRootLayers(true);
        return;
      case 'turnAllLayersOff':
        this.turnAllRootLayers(false);
        return;
      case 'expandAllLayers':
        this.foldOrUnfoldAllRootLayers(false);
        return;
      case 'collapseAlllayers':
        this.foldOrUnfoldAllRootLayers(true);
        return;
      default:
        return;
      }
    },
    
    _onOperationsMenuItemClickForGroup: function(item) {
      switch (item.key) {
      case '':
        this.turnAllRootLayers(true);
        return;
      case 'turnAllLayersOff':
        this.turnAllRootLayers(false);
        return;
      case 'expandAllLayers':
        this.foldOrUnfoldAllRootLayers(false);
        return;
      case 'collapseAlllayers':
        this.foldOrUnfoldAllRootLayers(true);
        return;
      default:
        return;
         
      }
    },

    isFirstDisplayedLayerInfo: function(layerInfo) {
      var isFirst;
      var steps;
      var layerInfoIndex;
      var layerInfoArray;
      if(layerInfo.isFirst || !layerInfo.isRootLayer()) {
        isFirst = true;
      } else {
        steps = this._getMovedSteps(layerInfo, "moveup");
        layerInfoArray = this.operLayerInfos.getLayerInfoArray();
        layerInfoIndex = this.operLayerInfos._getTopLayerInfoIndexById(layerInfo.id);
        if(this.isLayerHiddenInWidget(layerInfoArray[layerInfoIndex - steps])) {
          isFirst = true;
        } else {
          isFirst = false;
        }
      }
      return isFirst;
    },

    isLastDisplayedLayerInfo: function(layerInfo) {
      var isLast;
      var steps;
      var layerInfoIndex;
      var layerInfoArray;
      if(layerInfo.isLast || !layerInfo.isRootLayer()) {
        isLast = true;
      } else {
        steps = this._getMovedSteps(layerInfo, "movedown");
        layerInfoArray = this.operLayerInfos.getLayerInfoArray();
        layerInfoIndex = this.operLayerInfos._getTopLayerInfoIndexById(layerInfo.id);
        if(this.isLayerHiddenInWidget(layerInfoArray[layerInfoIndex + steps])) {
          isLast = true;
        } else {
          isLast = false;
        }
      }
      return isLast;
    },

    moveUpLayer: function(layerInfo) {
      // summary:
      //    move up layer in layer list.
      // description:
      //    call the moveUpLayer method of LayerInfos to change the layer order in map,
      //    and update the data in LayerInfos
      //    then, change layerNodeTr and layerContentTr domNode
      var steps = this._getMovedSteps(layerInfo, 'moveup');
      this.layerListWidget._denyLayerInfosReorderResponseOneTime = true;
      var beChangedLayerInfo = this.operLayerInfos.moveUpLayer(layerInfo, steps);
      if (beChangedLayerInfo) {
        this._exchangeLayerTrNode(beChangedLayerInfo, layerInfo);
      }
    },

    moveDownLayer: function(layerInfo) {
      // summary:
      //    move down layer in layer list.
      // description:
      //    call the moveDownLayer method of LayerInfos to change the layer order in map,
      //    and update the data in LayerInfos
      //    then, change layerNodeTr and layerContentTr domNode
      var steps = this._getMovedSteps(layerInfo, 'movedown');
      this.layerListWidget._denyLayerInfosReorderResponseOneTime = true;
      var beChangedLayerInfo = this.operLayerInfos.moveDownLayer(layerInfo, steps);
      if (beChangedLayerInfo) {
        this._exchangeLayerTrNode(layerInfo, beChangedLayerInfo);
      }
    },

    isLayerHiddenInWidget: function(layerInfo) {
      var isHidden = false;
      var currentLayerInfo = layerInfo;
      if(layerInfo &&
         this.config.layerOptions &&
         this.config.layerOptions[layerInfo.id] !== undefined) {
        while(currentLayerInfo) {
          isHidden = isHidden ||  !this.config.layerOptions[currentLayerInfo.id].display;
          if(isHidden) {
            break;
          }
          currentLayerInfo = currentLayerInfo.parentLayerInfo;
        }
      } else {
        // if config has not been configured, default value is 'true'.
        // if config has been configured, but new layer of webmap is ont in config file,
        //   default value is 'true'.
        isHidden = false;
      }
      return isHidden;
    },

    turnAllRootLayers: function(isOnOrOff) {
//        var j =0;
//        for(i=0;i<this.finalGroup.length;i++){
//            query("[class~='visible-checkbox-" + j + "']", this.domNode)
//          .forEach(function(visibleCheckBoxDomNode) {
//         //   var visibleCheckBox = registry.byNode(visibleCheckBoxDomNode);
//                var checkboxName = "visible-checkbox-" + j;
//                var afterDiv = "jimu_dijit_CheckBox_" + j;
//            if(isOnOrOff) {
//                 document.getElementsByClassName(checkboxName).checked = true; 
//           // document.getElementsByClassName(checkboxName).afterDiv.firstElementChild.className = "checkbox jimu-float-leading";
//              //visibleCheckBox.check();
//            } else {
//              //visibleCheckBox.uncheck();
//         document.getElementsByClassName(checkboxName).checked = false; 
//            }
//         
//          }, this);
//            j = j + 2; 
//        }
        
      var layerInfoArray = this.operLayerInfos.getLayerInfoArray();
      array.forEach(layerInfoArray, function(layerInfo) {
        if (!this.isLayerHiddenInWidget(layerInfo)) {
          layerInfo.setTopLayerVisible(isOnOrOff);
        }
      }, this);
        
    },

    turnAllSameLevelLayers: function(layerInfo, isOnOrOff) {
      var layerOptions = {};
      var rootLayerInfo = layerInfo.getRootLayerInfo();
      rootLayerInfo.traversal(lang.hitch(this, function(subLayerInfo) {
        if(subLayerInfo.parentLayerInfo &&
           subLayerInfo.parentLayerInfo.id === layerInfo.parentLayerInfo.id &&
           !this.isLayerHiddenInWidget(subLayerInfo)) {
          layerOptions[subLayerInfo.id] = {visible: isOnOrOff};
        } else {
          layerOptions[subLayerInfo.id] = {visible: subLayerInfo.isVisible()};
        }
      }));
      rootLayerInfo.resetLayerObjectVisibility(layerOptions);
    },

    foldOrUnfoldAllRootLayers: function(isFold) {
      var layerInfoArray = array.filter(this.operLayerInfos.getLayerInfoArray(),
                                        function(layerInfo) {
        return !this.isLayerHiddenInWidget(layerInfo);
      }, this);
      this._foldOrUnfoldLayers(layerInfoArray, isFold);
    },

    foldOrUnfoldSameLevelLayers: function(layerInfo, isFold) {
      var layerInfoArray;
      if(layerInfo.parentLayerInfo) {
        layerInfoArray = array.filter(layerInfo.parentLayerInfo.getSubLayers(),
                                          function(layerInfo) {
          return !this.isLayerHiddenInWidget(layerInfo);
        }, this);
        this._foldOrUnfoldLayers(layerInfoArray, isFold);
      }
    },
      
     toggle : function(e) {
      this.count = this.count + 1;
        if(this.count%2 == 0)
        {this.turnAllRootLayers(true);
//        document.getElementsByClassName('checkbox jimu-float-leading').classList.add('checked');
        } 
         else {
//             document.getElementsByClassName('checkbox jimu-float-leading').classList.remove('checked');
            this.turnAllRootLayers(false);  
             
            }
  }
    ,
      
      offAll : function(e) {
    this.turnAllRootLayers(false);  
  }
    ,
     onAll : function(e) {
    this.turnAllRootLayers(true);  
  }
      
  

  });
});