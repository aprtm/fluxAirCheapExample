import { Dispatcher } from 'flux';
// intercept the dispatch method to keep a log of the actions being dispatched
class AppDispatcher extends Dispatcher<any>{
    dispatch( action = {}){
        console.log('Dispatched', action);
        super.dispatch(action);
    }
}
export default new AppDispatcher();