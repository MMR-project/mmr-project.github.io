window.addEventListener("load", function(){
	var isInstallable = function(){
		return navigator.mozApps && navigator.mozApps.install;
	};

	var createInstallAction = function(manifest, name){
		return function(event){
			event.preventDeafult();
			if(manifest){
				var response = navigator.mozApps.install(manifest);
				response.onsuccess = function(data){
					alert("インストールできました:" + (name || manifest));
				};
				response.onerror = function(){
					alert("インストールできませんできした:" + (name || manifest));
				};
			}
		};
	};

	if(isInstallable()){
		var link = document.getElementsByClassName("install");
		for(var i = 0; i < link.length; i++){
			var manifest = link[i].getAttribute("href");
			var name = link[i].textContent;
			link[i].addEventListener("click", createInstallAction(manifest, name));
		}
	}

});
