import React from 'react';
import { connect } from 'react-redux';

const Alerts = ({ alerts }) => {
    return (
        alerts.length !== 0 && alerts.map((alert) => {
            return (
                <div key={alert.id} className={`alert alert-${alert.type}`}>
                    <i className='fas fa-info-circle' />{' '}{alert.msg}
                </div>
            )
        })
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    contact: state.contact,
    alerts: state.alert
});

export default connect(mapStateToProps)(Alerts)
