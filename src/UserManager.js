import {
  SpinalContext,
  SpinalNode,
  SPINAL_RELATION_LST_PTR_TYPE,
  SpinalGraphService
} from 'spinal-env-viewer-graph-service';
const ColasContextName = 'ColasUser';
const ColasRelationName = 'ColasUserRelationName';
const ColasRelationType = SPINAL_RELATION_LST_PTR_TYPE;

/**
 * Class used to retrieve the user
 */
export default class UserManager {
  constructor() {
    this.initialized = this.init();
  }


  init() {
    return SpinalGraphService.initialized.then(() => {
        this.graph = SpinalGraphService.getGraph();
        return this.graph
      })
      .then(() => this.graph.getChildren())
      .then((children) => {
        for (let i = 0; i < children.length; i++) {
          if (children[i].info.name.get() === ColasContextName) {
            return children[i];
          }
        }
        return undefined;
      })
      .then((context) => {
        if (typeof context !== 'undefined') this.colasUserContext = context;
        else {
          const colasContext = new SpinalContext(ColasContextName);
          this.graph.addContext(colasContext)
            .then((c) => { this.colasUserContext = c; });
        }
      });
  }

  register(name, email, zip, isAdmin) {
    return this.initialized
      .then(() => this.colasUserContext.getChildren([ColasRelationName]))
      .then((children) => {
        for (let i = 0; i < children.length; i++) {
          if (children[i].email.get() === email) return false;
        }
        return true;
      })
      .then((canRegister) => {
        if (canRegister) {
          const user = new SpinalNode('info', undefined, undefined);
          user.add_attr({
            zipCode: zip, nbConnection: 1, lastCo: new Date().getTime(), isAdmin, email,
          });
          user.info.add_attr({name});
          return this.colasUserContext.addChildInContext(user, ColasRelationName, ColasRelationType, this.colasUserContext);
        }
        return undefined;
      })
      .then((user) => {
        return user;
      });
  }

  /**
   * Compare to date return false if it the same day
   * @param d1 previous date
   * @param d2 new date
   * @return {boolean}
   * @private
   */
  isANewDay(d1, d2) {
    return !(d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate());
    
  }

  connect(id) {
    return this.initialized
      .then(() => this.colasUserContext.getChildren([ColasRelationName]))
      .then((children) => {
        for (let i = 0; i < children.length; i++) {
          if (children[i].info.id.get() === id) {
            const user = children[i];
            const lastCo = new Date(user.lastCo.get());
            if (this.isANewDay(lastCo, new Date())) {
              user.nbConnection.set(user.nbConnection.get() + 1);
            }
            return children[i];
          }
        }
        return false;
      });
  }

  getUsers() {
    return this.initialized
      .then(() => this.colasUserContext.getChildren([ColasRelationName]));
  }

  getUser(id) {
    return this.initialized
      .then(() => this.colasUserContext.getChildren([ColasRelationName]))
      .then((children) => {
        for (let i = 0; i < children.length; i++) {
          if (children[i].info.id.get() === id) {
            return children[i];
          }
        }
        return undefined;
      });
  }
  
  getUserByEmail(email){
    return this.initialized
      .then(() => this.colasUserContext.getChildren([ColasRelationName]))
      .then((children) => {
        for (let i = 0; i < children.length; i++) {
          if (children[i].email.get() === email) {
            return children[i];
          }
        }
        return undefined;
      });
  }
}
