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
        'dojo/_base/declare',
        'jimu/BaseWidgetSetting',
        'jimu/LayerInfos/LayerInfos',
        'dijit/_WidgetsInTemplateMixin',
        './LayerSelector',
         'dojo/_base/array',
        'dijit/form/Select',
        'dojo/dom-construct',
        'dojo/on',
        'dojo/_base/lang'
      ],
      function(
        declare,
        BaseWidgetSetting,
        LayerInfos,
        _WidgetsInTemplateMixin,
        LayerSelector,
        array,Select,domConstruct,on,lang) {
        return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {

          baseClass: 'jimu-widget-layerList-setting',
          finalGroup: [], 
          groupLayers: '',
            clicks : 0,
            newDiv : '',
            html:'',
            noOfGroup:null,
            groupsArray : [],
            lastValue : 0,
            
          startup: function() {
            this.inherited(arguments);
            this.setConfig(this.config);
            this.createLayerSelector();
          },

          createLayerSelector: function() {
              var layerInfosObj = LayerInfos.getInstanceSync();
              var listOflayers = layerInfosObj._finalLayerInfos;
              this.finalGroupSetting({'groupname':listOflayers[0].title,'layers':[listOflayers[0]]});
              var noOfGroupElement = document.getElementById('noOfGroup');
              var noOfGroup = dijit.byId("noOfGroup");
              var clicks = 1;
              var group = [{'label':'1','value':'1'},{'label':'2','value':'2'},{'label':'3','value':'3'},{'label':'4','value':'4'},{'label':'5','value':'5'},{'label':'6','value':'6'},{'label':'7','value':'7'},{'label':'8','value':'8'},{'label':'9','value':'9'},{'label':'10','value':'10'},{'label':'11','value':'11'}];
              var selectDiv1 = document.getElementById('groupInputField');
               var  selectDiv = domConstruct.create('div',{
                        'class' : 'group-div'
                        },selectDiv1); 
              var selectElement = new Select({
                name: "selectGroup",
                options:group }); 
                domConstruct.place(selectElement.domNode, selectDiv);
                
                this.own(on(selectElement,
                'change',
                lang.hitch(this,
                  this.finalGroupSetting,selectElement)));   
              var groupsArray = []
              dojo.connect(noOfGroup, "onChange", function(){
                  console.log(noOfGroup.value,clicks)
                for(var i=0;i<noOfGroup.value;i++){ 
                var group= dijit.byId("noOfGroup").value;
                   var myTableDiv = document.getElementById("divname");
                var table = document.createElement('TABLE');
//                     var tableBody = document.createElement('TBODY');
                    // table.appendChild(tableBody);
                
                 this.html += "<option value='group'>group</option>";
                 var tr = document.createElement('TR');
                table.appendChild(tr);        
                var td = document.createElement('TD');
                 var input = document.createElement('input');
                    input.type = 'text';
                  clicks = clicks+1;
                  input.id = "group"+clicks; 
                 //input.contentEditable = "true";
                td.appendChild(input);
                td.appendChild(document.createTextNode('Enter Group Name'));
                console.log("-------------",td)
                tr.appendChild(td);
                }
                   groupsArray = []; 
              myTableDiv.appendChild(table);
                  for(var i=1;i<=clicks;i++){  
                  groupsArray.push(document.getElementById('group'+i).innerHTML);
                  console.log(document.getElementById('group'+i).innerHTML);
                  console.log(groupsArray);
                      
              }
              });
              
              this.groupsArray = groupsArray;
               console.log(this.groupsArray);
//              array.forEach(, function(layerInfo, index) {
//                  
//                  
//                  
//              },this);
              
              //var noOfGroup = noOfGroup.value;
              //this.own(on(noOfGroupElement,'click',lang.hitch(this,this.noOfGroupCreation,noOfGroup)));
             this.groupLayers= dojo.subscribe("globalEvents", this.finalGroupSetting1.bind(this));
               this.newDiv=document.createElement('div');
                this.html = '<select class="select-option-group">';
                   this.layerSelector = new LayerSelector({
              operLayerInfos: layerInfosObj,
              config: this.config
            }).placeAt(this.layerSelectorDiv);
          },
            groupArray: function(noOfGroups){
               console.log("last value",this.lastValue)
                 for(var i=1;i<=this.lastValue;i++){
                      var groupName = document.getElementById('group'+i).innerHTML;
                     this.groupsArray.push(groupName);
                     var noofgroup = this.lastValue;
                     console.log(this.groupsArray)
                     dojo.publish("groupsDone",{'groupname':groupName,'layers':noofgroup});   
                 }
            },finalGroupSetting1: function(group) { 
            console.log(group);
            this.emit('final-group',group);
            
            },
             finalGroupSetting: function(group) { 
                 var increasedValue = 0,decreasedValue = 0;
                console.log(this.lastValue,group.value,increasedValue)
                 if(this.lastValue == NaN || group.value == undefined)
                     {
                         this.lastValue = 0;
                         group.value = "0";
                     }
                 if(this.lastValue < Number(group.value)){
                     increasedValue = group.value - this.lastValue;
                     console.log(this.lastValue,group.value,increasedValue)
                 for(var i=0;i<increasedValue;i++){
                 var myTableDiv = document.getElementById("divname");
                var table = document.createElement('TABLE');
                     this.clicks = this.clicks+1;
                     table.id = "group-table"+this.clicks;
                this.html += "<option value='group'>group</option>";
                 var tr = document.createElement('TR');
                table.appendChild(tr);        
                var td = document.createElement('TD');
                 var input = document.createElement('input');
                    input.type = 'text';
                  clicks = clicks+1;
                     input.id = "group"+this.clicks; 
                     //input.contentEditable = "true";
                td.appendChild(input);
                td.appendChild(document.createTextNode('Enter Group Name'));
                     tr.appendChild(td);
                     var td = document.createElement('TD');
                     var pencil = td.appendChild(document.createElement('span'));
                     pencil.className = "pencil";
                     pencil.innerHTML = '&#9998;';
                     tr.appendChild(td);
                     var td = document.createElement('TD');
                     var done = td.appendChild(document.createElement('span'));
                     done.className = "done";
                     done.innerHTML = '&#10003;';
                     this.own(on(done,
                'click',
                lang.hitch(this,
                  this.groupArray,done)));   
                     
                input.appendChild(document.createTextNode('Enter Group Name'));
                tr.appendChild(td);
                      myTableDiv.appendChild(table);
               }
                 }
                 else{
                     decreasedValue = this.lastValue - Number(group.value);
                     console.log("decrease",Number(group.value),decreasedValue)
                       for(var i=this.lastValue;i>Number(group.value);i--){
	                       var tbl = document.getElementById('group-table'+i);
                          tbl.deleteRow(0);
                       }
                     
                 }
                 this.lastValue = Number(group.value);
                 console.log("last value",this.lastValue)
                 for(var i=1;i<=this.lastValue;i++){
                      var groupName = document.getElementById('group'+i).innerHTML;
                     console.log(groupName)
                 }
                 
             },

          setConfig: function(config) {
            this.showLegend.setValue(config.showLegend);
            if(config.contextMenu) {
              this.zoomto.setValue(config.contextMenu.ZoomTo);
              this.transparency.setValue(config.contextMenu.Transparency);
              this.controlPopup.setValue(config.contextMenu.EnableOrDisablePopup);
              this.moveupDown.setValue(config.contextMenu.MoveupOrMovedown);
              this.table.setValue(config.contextMenu.OpenAttributeTable);
              this.url.setValue(config.contextMenu.DescriptionOrShowItemDetailsOrDownload);
            }
          },

          getConfig: function() {
            this.config.showLegend = this.showLegend.getValue();
            if(!this.config.contextMenu) {
              this.config.contextMenu = {};
            }
            this.config.contextMenu.ZoomTo = this.zoomto.getValue();
            this.config.contextMenu.Transparency = this.transparency.getValue();
            this.config.contextMenu.EnableOrDisablePopup = this.controlPopup.getValue();
            this.config.contextMenu.MoveupOrMovedown = this.moveupDown.getValue();
            this.config.contextMenu.OpenAttributeTable = this.table.getValue();
            this.config.contextMenu.DescriptionOrShowItemDetailsOrDownload = this.url.getValue();
            this.config.layerOptions = this.layerSelector.getLayerOptions();
            return this.config;
          }

        });
      });
