import { SpinalContextApp } from 'spinal-env-viewer-context-menu-service';


const { spinalPanelManagerService } = require( "spinal-env-viewer-panel-manager-service" );

export class ButtonCreateColasUser extends SpinalContextApp {
  
  constructor() {
    super( 'Edit timeline', 'Edit timeline', {
      icon: 'add',
      icon_type: 'in',
      backgroundColor: '#000000',
      fontColor: '#ffffff'
    } );
    
    this.action = this.openPanel.bind( this );
  }
  
  isShown(option) {
    if (option.selectedNode.name.get() === "ColasUser")
      return Promise.resolve( true );
    return Promise.resolve(-1);
  }
  
  openPanel() {
    spinalPanelManagerService.openPanel( "CreateColasUser")
  }
}