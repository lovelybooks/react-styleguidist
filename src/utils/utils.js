export function setComponentsNames(components) {
	components.map((component) => {
		let module = component.module;
		component.name = module.displayName || module.name;
		// "ProxyClass" is here because of https://github.com/gaearon/babel-plugin-react-transform/issues/19
		if (component.name === 'ProxyClass') {
			var m = /.*\/([^\/]+)\/index\.jsx?/.exec(component.filepath);
			component.name = m[1]; // HACK HACK HACK
		}
		if (!component.name) {
			throw Error(`Cannot detect component name for ${component.filepath}`);
		}
	});
	return components;
}

export function globalizeComponents(components) {
	components.map((component) => {
		global[component.name] = component.module;
	});
}
