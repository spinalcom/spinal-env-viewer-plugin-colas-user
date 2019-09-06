import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use( Vuetify );

import {
  SpinalMountExtention
} from "spinal-env-viewer-panel-manager-service"
import {
  spinalContextMenuService,
} from "spinal-env-viewer-context-menu-service";
import { ButtonCreateColasUser } from "./buttons/ButtonCreateColasUser";

import DialogCreateUser from "./vue/DialogCreateUser.vue";


const SIDE_BAR_HOOK_NAME = "GraphManagerSideBar";

spinalContextMenuService.registerApp( SIDE_BAR_HOOK_NAME, new ButtonCreateColasUser(), [7] );


SpinalMountExtention.mount( {
  // name registered.
  name: "CreateColasUser",
  // Vue.extend to create a Compoment constructor
  vueMountComponent: Vue.extend( DialogCreateUser ),
  // where to  append the Compoment
  parentContainer: document.body
} );
