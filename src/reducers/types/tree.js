
import { ADD_CHILD, REMOVE_CHILD, CREATE_NODE, DELETE_NODE } from '../../actions'


    const children = ( state, action ) => {


      switch ( action.type ) {

          case ADD_CHILD:

              return [ ...state, action.childId ];

          case REMOVE_CHILD:

              return state.filter( id => id !== action.childId );

          default:
              return state

      }


    };

    const node = ( state, action ) => {


        switch ( action.type ) {

            case CREATE_NODE:

                return {

                    id: action.nodeId,
                    parent: action.parentId,
                    children: [],
                    data: {
                        name: action.name,
                        text: action.text,
                        icon: action.icon
                    }

                };

            case ADD_CHILD:

            case REMOVE_CHILD:

                return {

                    ...state,
                    children: children( state.children, action )

                };

            default:
                return state

        }


    };

    const getAllDescendantIds = ( state, nodeId ) => (

        state[ nodeId ].children.reduce( ( acc, childId ) => (

            [ ...acc, childId, ...getAllDescendantIds( state, childId ) ]

        ), [] )

    );

    const deleteMany = ( state, ids ) => {

        state = { ...state };
        ids.forEach( id => delete state[ id ] );

        return state;

    };

    export const nodes = ( state = {}, action ) => {

        const { nodeId } = action;
        if ( typeof nodeId === 'undefined' ) {

            return state;

        }

        if ( action.type === DELETE_NODE ) {

            const descendantIds = getAllDescendantIds( state, nodeId );
            return deleteMany( state, [ nodeId, ...descendantIds ] )

        }

        return {

            ...state,
            [ nodeId ]: node( state[ nodeId ], action )

        }

    };
