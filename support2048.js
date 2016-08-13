
documentWidth = window.innerWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04*documentWidth;


function getPosTop(i,j){
	return cellSpace + i *(cellSpace+cellSideLength);
}

function getPosLeft(i,j){
	return cellSpace + j * (cellSpace+cellSideLength);
}

function getNumberBackgroundColor(number){
	switch(number){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f67e5f";break;
		case 32:return "#f59563";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09e";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
	return "black";
}

function getNumberNote(number){
	if(window.style=='Shu')
		return number;
	if(window.style=='Tou')
		return number;
	if(window.style=='Note'){
		switch(number){
			case 2:return "小白";break;
			case 4:return "实习生";break;
			case 8:return "程序员";break;
			case 16:return "项目经理";break;
			case 32:return "架构师";break;
			case 64:return "技术经理";break;
			case 128:return "高级经理";break;
			case 256:return "技术总监";break;
			case 512:return "副总裁";break;
			case 1024:return "CTO";break;
			case 2048:return "总裁";break;
			case 4096:return "逆天了";break;
			case 8192:return "神啊！";break;
		}
	}
}

function getNumberColor(number){
	if(number<=4){
		return "#776a65";
	}
	return "white";
}

function nospace(board){

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(board[i][j]==0)
				return false;
		};
	};
	return true;
}

function canMoveLeft(board){

	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if(board[i][j])
				if(board[i][j-1]==0 || board[i][j-1]==board[i][j])
					return true;
		};
	};
	return false;
}


function canMoveUp(board){

	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(board[i][j])
				if(board[i-1][j]==0 || board[i-1][j]==board[i][j])
					return true;
		};
	};
	return false;
}

function canMoveRight(board){

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 3; j++) {
			if(board[i][j])
				if(board[i][j+1]==0 || board[i][j+1]==board[i][j])
					return true;
		};
	};
	return false;
}


function canMoveDown(board){

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 4; j++) {
			if(board[i][j])
				if(board[i+1][j]==0 || board[i+1][j]==board[i][j] )
					return true;
		};
	};
	return false;
}



function noBlockHorizontal(row,col1,col2,board){
	for (var i = col1+1; i < col2; i++) {
		if(board[row][i]!==0){
			return false;
		}
	};
	return true;
}


function noBlockVertical(col,row1,row2,board){
	for (var j = row1+1; j < row2; j++) {
		if(board[j][col]!==0){
			return false;
		}
	};
	return true;
}

function nomove(board){
	if(canMoveLeft(board)|| canMoveRight(board)||canMoveDown(board)||canMoveUp(board)){
		return false;
	}
	return true;
}

function writecookie(score,board){
	setcookie('score',score);
	var cdc = json_encode(board);
	setcookie('board',cdc);
}

function setcookie(name,value){
	document.cookie = name +'='+value;
}


function json_encode(mixed_val) {  
    // Returns the JSON representation of a value  
    //  
    // version: 906.1806  
    // discuss at: http://phpjs.org/functions/json_encode  
    // +      original by: Public Domain (http://www.json.org/json2.js)  
    // + reimplemented by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)  
    // + improved by: T.J. Leahy  
    // *     example 1: json_encode(['e', {pluribus: 'unum'}]);  
    // *     returns 1: '[\n    "e",\n    {\n    "pluribus": "unum"\n}\n]'  
    /* 
        http://www.JSON.org/json2.js 
        2008-11-19 
        Public Domain. 
        NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK. 
        See http://www.JSON.org/js.html 
    */  
    var json = this.window.JSON;  
    if (typeof json === 'object' && typeof json.stringify === 'function') {  
        return json.stringify(mixed_val);  
    }  
  
    var value = mixed_val;  
  
    var quote = function (string) {  
        var escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;  
        var meta = {    // table of character substitutions  
            '\b': '\\b',  
            '\t': '\\t',  
            '\n': '\\n',  
            '\f': '\\f',  
            '\r': '\\r',  
            '"' : '\\"',  
            '\\': '\\\\'  
        };  
  
        escapable.lastIndex = 0;  
        return escapable.test(string) ?  
        '"' + string.replace(escapable, function (a) {  
            var c = meta[a];  
            return typeof c === 'string' ? c :  
            '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);  
        }) + '"' :  
        '"' + string + '"';  
    };  
  
    var str = function(key, holder) {  
        var gap = '';  
        var indent = '    ';  
        var i = 0;          // The loop counter.  
        var k = '';          // The member key.  
        var v = '';          // The member value.  
        var length = 0;  
        var mind = gap;  
        var partial = [];  
        var value = holder[key];  
  
        // If the value has a toJSON method, call it to obtain a replacement value.  
        if (value && typeof value === 'object' &&  
            typeof value.toJSON === 'function') {  
            value = value.toJSON(key);  
        }  
  
        // What happens next depends on the value's type.  
        switch (typeof value) {  
            case 'string':  
                return quote(value);  
  
            case 'number':  
                // JSON numbers must be finite. Encode non-finite numbers as null.  
                return isFinite(value) ? String(value) : 'null';  
  
            case 'boolean':  
            case 'null':  
                // If the value is a boolean or null, convert it to a string. Note:  
                // typeof null does not produce 'null'. The case is included here in  
                // the remote chance that this gets fixed someday.  
  
                return String(value);  
  
            case 'object':  
                // If the type is 'object', we might be dealing with an object or an array or  
                // null.  
                // Due to a specification blunder in ECMAScript, typeof null is 'object',  
                // so watch out for that case.  
                if (!value) {  
                    return 'null';  
                }  
  
                // Make an array to hold the partial results of stringifying this object value.  
                gap += indent;  
                partial = [];  
  
                // Is the value an array?  
                if (Object.prototype.toString.apply(value) === '[object Array]') {  
                    // The value is an array. Stringify every element. Use null as a placeholder  
                    // for non-JSON values.  
  
                    length = value.length;  
                    for (i = 0; i < length; i += 1) {  
                        partial[i] = str(i, value) || 'null';  
                    }  
  
                    // Join all of the elements together, separated with commas, and wrap them in  
                    // brackets.  
                    v = partial.length === 0 ? '[]' :  
                    gap ? '[\n' + gap +  
                    partial.join(',\n' + gap) + '\n' +  
                    mind + ']' :  
                    '[' + partial.join(',') + ']';  
                    gap = mind;  
                    return v;  
                }  
  
                // Iterate through all of the keys in the object.  
                for (k in value) {  
                    if (Object.hasOwnProperty.call(value, k)) {  
                        v = str(k, value);  
                        if (v) {  
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);  
                        }  
                    }  
                }  
  
                // Join all of the member texts together, separated with commas,  
                // and wrap them in braces.  
                v = partial.length === 0 ? '{}' :  
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +  
                mind + '}' : '{' + partial.join(',') + '}';  
                gap = mind;  
                return v;  
        }  
    };  
  
    // Make a fake root object containing our value under the key of ''.  
    // Return the result of stringifying the value.  
    return str('', {  
        '': value  
    });  
}  