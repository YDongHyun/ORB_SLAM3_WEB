const yaml = require('js-yaml');
const fs = require('fs');

try {
   let fileContent = fs.readFileSync('../src/orb_slam3_ros/config/Monocular/EuRoC.yaml', 'utf8'); 
   const lines = fileContent.split('\n');
   lines.shift();
   fileContent = lines.join('\n');   
   fs.writeFileSync('../src/orb_slam3_ros/config/Monocular/EuRoC.yaml', fileContent, 'utf8');

   const parsedYaml = yaml.load(fileContent);
   parsedYaml['Camera1.fx']=1;
   parsedYaml['Camera1.fy']=1;
   parsedYaml['Camera1.cx']=1;
   parsedYaml['Camera1.cy']=1;
   parsedYaml['Camera.width']=1;
   parsedYaml['Camera.height']=1;
   parsedYaml['Camera.fps']=1;

   console.log(parsedYaml);
   lines.unshift('%YAML:1.0');
   fileContent = lines.join('\n');   
   fs.writeFileSync('../src/orb_slam3_ros/config/Monocular/EuRoC.yaml', fileContent, 'utf8');


} catch (e) {
   console.log(e);
}

