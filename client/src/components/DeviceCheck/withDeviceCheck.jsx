import DeviceCheck from './deviceCheck.jsx';

const withDeviceCheck = (WrappedComponent) => {
  return function DeviceCheckedComponent(props) {
    return (
      <DeviceCheck>
        <WrappedComponent {...props} />
      </DeviceCheck>
    );
  };
};

export default withDeviceCheck;
