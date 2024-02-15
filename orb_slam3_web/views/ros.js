var ros = new ROSLIB.Ros();
ros.connect('ws://0.0.0.0:9090');

  // Create the main viewer.
  var viewer = new ROS3D.Viewer({
    divID : 'viewer',
    width : 800,
    height : 600,
    antialias : true
  });

  // Setup a client to listen to TFs.
  var tfClient = new ROSLIB.TFClient({
    ros : ros,
    angularThres : 0.01,
    transThres : 0.01,
    rate : 10.0,
    fixedFrame : '/os_sensor'
  });

  var cloudClient = new ROS3D.PointCloud2({
    ros: ros,
    tfClient: tfClient,
    rootObject: viewer.scene,
    topic: '/orb_slam3/all_points',
    material: { size: 0.11, color: 0xffffff },
  });

  const raw_images= document.querySelector('#raw-image');

  var raw_img_listener = new ROSLIB.Topic({
    ros : ros,
    name : '/compressed_raw',
    messageType : 'sensor_msgs/CompressedImage'
  });

  raw_img_listener.subscribe(function(message) {
    let raw_img_source = `data:image/png;base64,${message.data}`;
    raw_images.setAttribute("src",raw_img_source);
  });

  const orb_images= document.querySelector('#orb-image');

  var orb_img_listener = new ROSLIB.Topic({
    ros : ros,
    name : '/orb_img',
    messageType : 'sensor_msgs/CompressedImage'
  });

  orb_img_listener.subscribe(function(message) {
    let raw_img_source = `data:image/png;base64,${message.data}`;
    orb_images.setAttribute("src",raw_img_source);
  });