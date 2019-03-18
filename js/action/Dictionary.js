function Dictionary() {
	this.data = new Array();

	this.put = function(key, value) {
		this.data[key] = value;
	};

	this.get = function(key) {
		return(this.data[key] != undefined || this.data[key] != null) ? this.data[key] : new Array(-1, -1);
	};

	this.remove = function(key) {
		this.data[key] = -1;
	};

	this.getKey = function() {
		var keyArray = Object.keys(this.data);
		for(var i = 0; i < keyArray.length; i++) {
			var tmpA = this.data[keyArray[i]];
			//alert(tmpA);
			if(tmpA == undefined || tmpA == null) {
				keyArray.remove(i);
				i--;
			}

			var b = true;
			for(var x = 0; x < tmpA.length; x++) {
				if(tmpA[x] != -1) {
					b = false;
					break;
				}
			}
			if(b) {
				keyArray.remove(i);
				i--;
			}
		}
		return keyArray;
	};

	this.isEmpty = function() {
		return this.size() == 0;
	};

	this.size = function() {
		/*var keyArray = Object.keys(this.data);
		var num = 0;
		for(var i = 0 ; i < keyArray.length ; i++){
			
			var tmpA = this.data[keyArray[i]];
			if(tmpA == undefined || tmpA == null){
				continue;
			}
			
			var b = true;
			for(var x = 0 ; x < tmpA.length ; x++){
				if(tmpA[x] != -1){
					b = false;
					break;
				}
			}
			if(b){
				continue;
			}
			
			num++;
		}
		return num;*/
		return this.getKey().length;
		//return 1;
	};
}

Array.prototype.remove = function(obj) {
	for(var i = 0; i < this.length; i++) {
		var temp = this[i];
		if(!isNaN(obj)) {
			temp = i;
		}
		if(temp == obj) {
			for(var j = i; j < this.length; j++) {
				this[j] = this[j + 1];
			}
			this.length = this.length - 1;
		}
	}
}