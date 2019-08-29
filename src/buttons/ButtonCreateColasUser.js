import { SpinalContextApp } from 'spinal-env-viewer-context-menu-service';
import {
  ColasContextName,
  ColasUserType
} from "../UserManager";


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
  
  isShown( option ) {
    if (option.selectedNode.name.get() !== ColasContextName)
    {
      this.label = "Edit user";
      this.icon = 'edit'
    }    else
    {
      this.label = "Create user";
      this.icon = 'add'
    }
    if (option.selectedNode.name.get() === ColasContextName
      || option.selectedNode.type.get() === ColasUserType)
      return Promise.resolve( true );
    return Promise.resolve( -1 );
  }
  
  openPanel( option ) {
    console.log( option )
    if (option.selectedNode.name.get === ColasContextName)
      spinalPanelManagerService.openPanel( "CreateColasUser" );
    else spinalPanelManagerService.openPanel( "CreateColasUser", option.selectedNode );
  }
}