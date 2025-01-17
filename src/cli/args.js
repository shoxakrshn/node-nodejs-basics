const parseArgs = () => {
  const args = process.argv.slice(2);

  const parsedArgs = [];

  for (let i = 0; i < args.length; i += 2) {
    const propName = args[i].replace('--', '');
    const propValue = args[i + 1];
    parsedArgs.push(`${propName} is ${propValue}`);
  }

  console.log(parsedArgs.join(', '));
};

parseArgs();
