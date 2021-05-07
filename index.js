// Import stylesheets
import './style.css';

var familyTree = [
  {
    name: 'King',
    gender: 'male',
    pid: null,
    fid: 1
  },
  {
    name: 'Queen',
    gender: 'female',
    pid: null,
    fid: 1
  },
  {
    name: 'Chit',
    gender: 'male',
    pid: 1,
    fid: 2
  },
  {
    name: 'Amba',
    gender: 'female',
    pid: null,
    fid: 2
  },
  {
    name: 'Ish',
    gender: 'male',
    pid: 1,
    fid: null
  },
  {
    name: 'Vich',
    gender: 'male',
    pid: 1,
    fid: 3
  },
  {
    name: 'Lica',
    gender: 'female',
    pid: null,
    fid: 3
  },
  {
    name: 'Dritha',
    gender: 'male',
    pid: 2,
    fid: 4
  },
  {
    name: 'Jaya',
    gender: 'female',
    pid: null,
    fid: 4
  },
  {
    name: 'Tritha',
    gender: 'female',
    pid: 2,
    fid: null
  },
  {
    name: 'Vritha',
    gender: 'male',
    pid: 2,
    fid: null
  },
  {
    name: 'Yodhan',
    gender: 'male',
    pid: 4,
    fid: null
  },
  {
    name: 'Vila',
    gender: 'female',
    pid: 3,
    fid: null
  },
  {
    name: 'Chika',
    gender: 'female',
    pid: 3,
    fid: null
  },
  {
    name: 'Aras',
    gender: 'male',
    pid: 1,
    fid: 5
  },
  {
    name: 'Chitra',
    gender: 'female',
    pid: null,
    fid: 5
  },
  {
    name: 'Ahit',
    gender: 'male',
    pid: 5,
    fid: null
  },
  {
    name: 'Jnki',
    gender: 'female',
    pid: 5,
    fid: 6
  },
  {
    name: 'Arit',
    gender: 'male',
    pid: null,
    fid: 6
  },
  {
    name: 'Laki',
    gender: 'male',
    pid: 6,
    fid: null
  },
  {
    name: 'Lavnya',
    gender: 'female',
    pid: 6,
    fid: null
  },
  {
    name: 'Satya',
    gender: 'female',
    pid: 1,
    fid: 7
  },
  {
    name: 'Vyan',
    gender: 'male',
    pid: null,
    fid: 7
  },
  {
    name: 'Asva',
    gender: 'male',
    pid: 7,
    fid: 8
  },
  {
    name: 'Satvy',
    gender: 'female',
    pid: null,
    fid: 8
  },
  {
    name: 'Vasa',
    gender: 'male',
    pid: 8,
    fid: null
  },
  {
    name: 'Vyas',
    gender: 'male',
    pid: 7,
    fid: 9
  },
  {
    name: 'Krpi',
    gender: 'female',
    pid: null,
    fid: 9
  },
  {
    name: 'Kriya',
    gender: 'male',
    pid: 9,
    fid: null
  },
  {
    name: 'Kriti',
    gender: 'female',
    pid: 9,
    fid: null
  },
  {
    name: 'Atya',
    gender: 'female',
    pid: 7,
    fid: null
  }
];
console.log(familyTree);

function addChild(familyTree, mname, cname, cgender) {
  const mObj = familyTree.find(a => a.name === mname);
  if (!mObj || !mObj.fid) return alert('Please provide valid details');
  const cObj = {
    name: cname,
    gender: cgender,
    pid: mObj.fid,
    fid: null
  };
  familyTree.push(cObj);
  console.log('CHILD_ADDITION_SUCCEEDED');
}

function getRelationshipPerson(name, relationship) {
  const mObj = familyTree.find(a => a.name === name);
  if (!mObj) return alert('Please provide valid name');

  switch (relationship) {
    case 'Paternal-Uncle':
      return getRelDetails('father', 'brother', mObj);
    case 'Maternal-Uncle':
      return getRelDetails('mother', 'brother', mObj);
    case 'Paternal-Aunt':
      return getRelDetails('father', 'sister', mObj);
    case 'Maternal-Aunt':
      return getRelDetails('mother', 'sister', mObj);
    case 'Sister-In-Law':
      return getInLaws('sister', mObj);
    case 'Brother-In-Law':
      return getInLaws('brother', mObj);
    case 'Father-In-Law':
      return getInLaws('father', mObj);
    case 'Mother-In-Law':
      return getInLaws('mother', mObj);
    case 'Son':
      return getChildnSib('son', mObj);
    case 'Daughter':
      return getChildnSib('daughter', mObj);
    case 'Siblings':
      return getChildnSib('siblings', mObj);
    default:
      return 'Not found';
  }
}

function getRelDetails(ptype, sbType, persObj) {
  const pgender = ptype === 'father' ? 'male' : 'female';
  const sibType = sbType === 'brother' ? 'male' : 'female';

  const parentObj = familyTree.find(
    a => persObj && persObj.pid && a.fid === persObj.pid && a.gender === pgender
  );
  var pSibList = familyTree.filter(
    a =>
      parentObj &&
      parentObj.pid &&
      a.pid === parentObj.pid &&
      a.gender === sibType &&
      a.name !== parentObj.name
  );
  return pSibList.length === 0 ? 'Not Found' : pSibList.map(a => a.name);
}

function getChildnSib(ctype, personObj) {
  const cgender = ctype === 'son' ? 'male' : 'female';
  var childs = [];
  if (ctype === 'siblings') {
    childs = familyTree.filter(
      a =>
        personObj &&
        personObj.pid &&
        a.pid === personObj.pid &&
        a.name !== personObj.name
    );
  } else {
    childs = familyTree.filter(
      a =>
        personObj &&
        personObj.fid &&
        a.pid === personObj.fid &&
        a.gender === cgender
    );
  }
  return childs.length === 0 ? 'Not Found' : childs.map(a => a.name);
}

function getInLaws(ilType, personObj) {
  const spouse = familyTree.find(
    a =>
      personObj &&
      personObj.fid &&
      a.fid === personObj.fid &&
      a.gender !== personObj.gender
  );

  var inLaws = [];
  if (ilType === 'sister' && spouse && spouse.pid) {
    inLaws = familyTree.filter(
      a =>
        a.pid === spouse.pid && a.gender === 'female' && a.name !== spouse.name
    );
  } else if (ilType === 'brother' && spouse.pid) {
    inLaws = familyTree.filter(
      a => a.pid === spouse.pid && a.gender === 'male' && a.name !== spouse.name
    );
  } else if (ilType === 'father' && spouse.pid) {
    inLaws = familyTree.filter(
      a => a.fid === spouse.pid && a.gender === 'male'
    );
  } else if (ilType === 'mother' && spouse.pid) {
    inLaws = familyTree.filter(
      a => a.fid === spouse.pid && a.gender === 'female'
    );
  }

  return inLaws.length === 0 ? 'Not Found' : inLaws.map(a => a.name);
}

/*==============JS=========*/

function printResult(arr) {
  console.log(Array.isArray(arr) ? arr.join(', ') : arr);
}

const divAddChild = document.getElementById('addChildId');
const divGetRel = document.getElementById('getRelationId');
var selVal = '';
document.getElementById('keytype').addEventListener('change', function(e) {
  selVal = e.target.value;
  divAddChild.classList.remove('showDiv');
  divGetRel.classList.remove('showDiv');
  if (selVal === 'ADD_CHILD') {
    divAddChild.classList.add('showDiv');
  } else if (selVal === 'GET_RELATIONSHIP') {
    divGetRel.classList.add('showDiv');
  }
});

document.getElementById('formId').addEventListener('submit', function(e) {
  e.preventDefault();
  if (selVal === 'ADD_CHILD') {
    var childName = document.getElementById('childName').value;
    var parentName = document.getElementById('parentName').value;
    var genderName = document.getElementById('genderName').value;
    printResult(addChild(familyTree, parentName, childName, genderName));
    console.log(familyTree);
  } else if (selVal === 'GET_RELATIONSHIP') {
    var personName = document.getElementById('personName').value;
    var relnName = document.getElementById('relName').value;
    printResult(getRelationshipPerson(personName, relnName));
  }
});

/*=======render tree========*/

function getTree(treeObj, fid) {
  var childs = familyTree.filter(a => a.pid === fid);
  var parents = familyTree.filter(a => a.fid === fid);

  treeObj.name = parents
    .map(a => a.name + '(' + (a.gender === 'male' ? 'M' : 'F') + ')')
    .join(', ');
  treeObj.children = [];
  for (let i = 0; i < childs.length; i++) {
    var lObj = {};
    if (childs[i].fid) getTree(lObj, childs[i].fid);
    else
      lObj = {
        name:
          childs[i].name + '(' + (childs[i].gender === 'male' ? 'M' : 'F') + ')'
      };
    treeObj.children.push(lObj);
  }
  return treeObj;
}

function getTreeHtml(treeObj, initHtml) {
  initHtml += '<li>' + treeObj.name + '</li>';
  if (treeObj.children) {
    initHtml += '<ul>';
    for (let i = 0; i < treeObj.children.length; i++) {
      initHtml += getTreeHtml(treeObj.children[i], '');
    }
    initHtml += '</ul>';
  }
  return initHtml;
}

document.getElementById('showTree').addEventListener('click', function(e) {
  var treeObj = {};
  treeObj = getTree(treeObj, 1);
  console.log(treeObj);
  var content = getTreeHtml(treeObj, '');
  document.getElementById('treeContainer').innerHTML =
    '<ul>' + content + '</ul>';
});
