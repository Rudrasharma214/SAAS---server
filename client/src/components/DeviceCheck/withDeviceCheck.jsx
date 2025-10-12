import DeviceCheck from './deviceCheck.jsx';

// Higher Order Component to wrap components with device check
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