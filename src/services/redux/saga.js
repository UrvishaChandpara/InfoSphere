import * as registrationSaga from "../Registration/saga";
import * as loginSaga from "../Login/saga"
import * as profileSaga from "../Profile/saga"
import * as serviceSaga from "../Service/saga"
import * as SubServiceSaga from "../Sub Service/saga"
import * as CustomerSaga from "../Customer/saga"
import * as CustomerServiceSaga from "../Customer Service/saga"
import * as BillSaga from "../Bill/saga"
import * as InvoiceSaga from "../Invoice/saga"
import { all,fork } from "redux-saga/effects";

export default function * rootSaga () {
    yield all(
      [
        ...Object.values(registrationSaga),
        ...Object.values(loginSaga),
        ...Object.values(profileSaga),
        ...Object.values(serviceSaga),
        ...Object.values(SubServiceSaga),
        ...Object.values(CustomerSaga),
        ...Object.values(CustomerServiceSaga),
        ...Object.values(BillSaga),
        ...Object.values(InvoiceSaga)
      ].map(fork),
    )
  }
