import {
  SpinalContext,
  SpinalNode,
  SPINAL_RELATION_LST_PTR_TYPE,
  SpinalGraphService
} from 'spinal-env-viewer-graph-service';

export const ColasContextName = 'ColasUser';
const ColasRelationName = 'ColasUserRelationName';
const ColasRelationType = SPINAL_RELATION_LST_PTR_TYPE;
export const ColasUserType = 'ColasUser';

/**
 * Class used to retrieve the user
 */
export default class UserManager {
  constructor() {
    this.initialized = this.init();
  }
  
  
  init() {
    return SpinalGraphService.initialized.then( () => {
        this.graph = SpinalGraphService.getGraph();
        return this.graph
      } )
      .then( () => this.graph.getChildren() )
      .then( ( children ) => {
        for (let i = 0; i < children.length; i++) {
          if (children[i].info.name.get() === ColasContextName) {
            return children[i];
          }
        }
        return undefined;
      } )
      .then( ( context ) => {
        if (typeof context !== 'undefined') this.colasUserContext = context;
        else {
          const colasContext = new SpinalContext( ColasContextName );
          this.graph.addContext( colasContext )
            .then( ( c ) => { this.colasUserContext = c; } );
        }
      } );
  }
  
  register( name, email, zip, isAdmin, password ) {
    return this.initialized
      .then( () => this.colasUserContext.getChildren( [ColasRelationName] ) )
      .then( ( children ) => {
        for (let i = 0; i < children.length; i++) {
          if (children[i].info.hasOwnProperty( 'email' ) && children[i].info.email.get() === email) return false;
        }
        return true;
      } )
      .then( ( canRegister ) => {
        if (canRegister) {
          const user = new SpinalNode( name, undefined, undefined );
          const info = {
            id: user.info.id.get(),
            type: ColasUserType,
            connections: [],
            name,
            isAdmin,
            email,
            password,
            zip
          };
          user.mod_attr( 'info', info );
          return this.colasUserContext.addChildInContext( user, ColasRelationName, ColasRelationType, this.colasUserContext );
        }
        return undefined;
      } )
      .then( ( user ) => {
        return user;
      } );
  }
  
  editUser( model ) {
    this.initialized
      .then( () => this.colasUserContext.getChildren( [ColasRelationName] ) )
      .then( ( children ) => {
        for (let i = 0; i < children.length; i++) {
          if (children[i].info.id.get() === model.id) {
            const child = children[i];
            child.info.name.set( model.name );
            child.info.isAdmin.set( model.isAdmin );
            child.info.zip.set( model.zip );
            child.info.email.set( model.email );
            if (model.password !== "")
              child.info.mod_attr( 'password', model.password );
            return;
          }
          
        }
        return;
      } )
  }
}
