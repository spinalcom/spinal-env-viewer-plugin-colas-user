import { SpinalContextApp } from 'spinal-env-viewer-context-menu-service';


const { spinalPanelManagerService } = require( "spinal-env-viewer-panel-manager-service" );

export class ButtonCreateColasUser extends SpinalContextApp {
  
  constructor() {
    super( 'Create User', 'Create an user for the public awareness interface', {
      icon: 'add',
      icon_type: 'in',
      backgroundColor: '#000000',
      fontColor: '#ffffff'
    } );
    
    this.action = this.openPanel.bind( this );
  }
  
  isShown(option) {
    if (option.selectedNode.hasOwnProperty('name') && option.selectedNode.name.get() === "ColasUser")
      return Promise.resolve( true );
    return Promise.resolve(-1);
  }
  
  openPanel() {
    spinalPanelManagerService.openPanel( "CreateColasUser")
  }
}