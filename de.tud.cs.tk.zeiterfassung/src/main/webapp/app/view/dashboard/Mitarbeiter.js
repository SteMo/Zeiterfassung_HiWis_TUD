/*
 * File: app/view/ui/MyViewport.js
 * Date: Sat Sep 10 2011 12:23:48 GMT+0200 (W. Europe Daylight Time)
 *
 * This file was generated by Ext Designer version 1.2.0.
 * http://www.sencha.com/products/designer/
 *
 * This file will be auto-generated each and everytime you export.
 *
 * Do NOT hand edit this file.
 */

Ext.define('AM.view.dashboard.Mitarbeiter', {

    alias : 'widget.dashboardMitarbeiter',
    extend: 'Ext.container.Container',
    
    id: "dashboardMitarbeiter", 

    initComponent: function() {
        var me = this;
        
        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
//            autoSync: true,
            model: 'AM.model.Vertragsdaten',  
        });           
        
        me.items = [
            {
                xtype: 'gridpanel',
                itemId: 'vertragsendeGrid',
                title: 'Vertragsende innerhalb der n&auml;chsten 2 Monate',
                columns: [
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'vorname',
                        text: 'Name',
                        renderer: function(val, meta, record) {
                            console.log("hier:");
                        	console.log(val);
                            console.log(meta);
                            console.log(record);
//                        	var userId = record.data.user_id;
                      }

                    },
                    {
                        xtype: 'datecolumn',
                        dataIndex: 'ende',
                        text: 'Vertragsende'
                    },
                    {
                        xtype: 'numbercolumn',
                        dataIndex: 'beginn',
                        text: 'Vertragsbeginn'
                    },
                    {
                        xtype: 'numbercolumn',
                        dataIndex: 'bool',
                        text: 'Offene Stunden'
                    },
                    {
                        xtype: 'numbercolumn',
                        text: 'Tarif'
                    }
                ],
                viewConfig: {

                }
            },
            {
                xtype: 'form',
                height: 87,
                itemId: 'infoForm',
                padding: '',
                layout: {
                    columns: 2,
                    type: 'table'
                },
                bodyPadding: 10,
                items: [
                    {
                        xtype: 'displayfield',
                        name: 'budget',
                        value: 'Display Field',
                        fieldLabel: 'Budget',
                        anchor: '100%'
                    },
                    {
                        xtype: 'displayfield',
                        name: 'aktiveHiWis',
                        value: 'Display Field',
                        fieldLabel: 'Aktive HiWis',
                        anchor: '100%'
                    },
                    {
                        xtype: 'displayfield',
                        name: 'vorgesetzter',
                        value: 'Display Field',
                        fieldLabel: 'Vorgesetzter'
                    },
                    {
                        xtype: 'displayfield',
                        name: 'aktiveAufgaben',
                        value: 'Display Field',
                        fieldLabel: 'Aktive Aufgaben'
                    },
                    {
                        xtype: 'displayfield',
                        name: 'fachgruppe',
                        value: 'Display Field',
                        fieldLabel: 'Fachgruppe'
                    }
                ]
            },
            {
                xtype: 'gridpanel',
                itemId: 'aufgabenDeadlineGrid',
                title: 'Aufgaben Deadlines',
                columns: [
                    {
                        xtype: 'datecolumn',
                        dataIndex: 'string',
                        text: 'Deadline'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 416,
                        dataIndex: 'number',
                        text: 'Aufgabe'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'date',
                        text: 'HiWi'
                    }
                ],
                viewConfig: {

                }
            }
        ];
        me.callParent(arguments);
    }
});