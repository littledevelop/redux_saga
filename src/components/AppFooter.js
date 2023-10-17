import React from 'react';
import moment from 'moment'

export const AppFooter = (props) => {
    return (
        <div className="layout-footer">
            {/* <img src={'assets/layout/images/koli-logo.png'} alt="Logo" height="20" className="mr-2" /> */}
            <span className="font-medium ml-2"><b>Copyright &copy; {moment().year()} KOLI Infotech Pvt. Ltd. | All rights Reserved | Contact</b></span>
        </div>
    );
}
