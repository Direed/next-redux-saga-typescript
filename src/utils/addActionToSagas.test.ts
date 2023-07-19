import {
  XHRMethod,
  createActionType,

  getActions,
  postActions,
  addActionToSagas,
} from 'utils';

describe('addActionToSagas', () => {
  it('adds GET actions to getActions array', () => {
    const TEST_GET = createActionType('TEST', XHRMethod.Get);
    addActionToSagas(TEST_GET);

    const getAction = getActions.find(action => action === TEST_GET.REQUEST);
    expect(getAction).toBe(TEST_GET.REQUEST);
  });

  it('adds POST actions to postActions array', () => {
    const TEST_POST = createActionType('TEST', XHRMethod.Post);
    addActionToSagas(TEST_POST);

    const saveAction = postActions.find(action => action === TEST_POST.REQUEST);
    expect(saveAction).toBe(TEST_POST.REQUEST);
  });
});
