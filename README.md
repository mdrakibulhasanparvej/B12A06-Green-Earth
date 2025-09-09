১. What is the difference between var, let, and const?

1.var
var শুধু ফাংশনের ভেতর সীমাবদ্ধ থাকে। কিন্তু যদি ফাংশনের বাইরে var লেখা হয়  তাহলে Global হয়ে যায়, var ডিক্লেয়ার করার আগে ব্যবহার করলে undefined রিটার্ন করবে (error দিবে না)। আবার Redeclaration (একই নাম বারবার ঘোষণা করা যায়)  সুতরাং var এর বড় সমস্যা হলো - এটা hoisting আর redeclaration এর কারণে বাগ তৈরি করে।

2. let
Block Scope: let ব্লকের ভেতরে সীমাবদ্ধ থাকে (যেমন { })।
Hoisting হলেও Temporal Dead Zone (TDZ): যদিও let ও hoist হয়, কিন্তু ডিক্লেয়ারেশনের আগে ব্যবহার করলে error দিবে।
No Redeclaration : একই scope-এ আবার let দিয়ে ঘোষণা করা যায় না।  তাই let হলো safer alternative to var।
________________________________________
3. const
Block Scope: const ও ব্লক scope এর মতো কাজ করে।
Must be Initialized: const ডিক্লেয়ার করার সময়ই ভ্যালু দিতে হবে।
Immutable Binding (Variable reference পরিবর্তন হয় না): মানে const ভেরিয়েবলকে নতুন ভ্যালু অ্যাসাইন করা যায় না।  তবে object বা array এর ভেতরের ডেটা পরিবর্তন করা যায়, কারণ const reference ধরে রাখে, ভেতরের data নয়।



২. What is the difference between map(), forEach(), and filter()?
উত্তরঃ
1. forEach()
•	শুধু loop চালানো যায় (প্রতিটি element এর উপর কাজ করে)।
•	কিছু return করে না (সবসময় undefined রিটার্ন করে)।
•	সাধারণত data প্রসেসিং / প্রিন্টিং / পরিবর্তন এর জন্য ব্যবহার করা হয়।
•	forEach() ব্যবহার করা হয় যখন শুধু কাজ করতে চাই তখনই, নতুন array দরকার পড়ে না।

2. map()
•	প্রতিটি element এর উপর কাজ করে এবং নতুন array রিটার্ন করে।
•	সব element কে transform/modify করার জন্য perfect এটি
•	map() ব্যবহার করা হয় যখন input array থেকে নতুন array বানাতে চাই।
________________________________________
3. filter()
1.	শর্ত (condition) চেক করে matching element গুলো দিয়ে নতুন array বানানোর কাজে লাগে।
2.	শর্ত মেনে element বেছে নতুন array দেয়
3.	filter() ব্যবহার করি যখন array থেকে শুধু কিছু element রাখতে চাই।



৩. What are arrow functions in ES6?

Arrow function হলো function লেখার একটা shortcut style। আগে যেখানে function কীওয়ার্ড লিখে লম্বা কোড লিখতে হতো, এখন => (fat arrow) দিয়ে ছোট করে লেখা যায়।
1.	ছোট ও সহজ syntax
o	function লেখার জন্য আর function কীওয়ার্ড লাগবে না।
o	অনেক সময় return লিখতেও হয় না, এক লাইনে ফলাফল পাওয়া যায়।
2.	this আলাদা নয়
o	সাধারণ function এ this অনেক সময় গ্লোবাল context বা অন্য কিছুতে bind হয়ে যায়।
o	কিন্তু arrow function এ this সবসময় parent scope (বাইরের পরিবেশ) থেকে নেয়।
o	এজন্য event বা asynchronous কাজের ক্ষেত্রে arrow function অনেক সুবিধাজনক।
3.	arguments object নেই
o	Normal function এর মধ্যে arguments বলে একটা pseudo-array পাওয়া যায় (যাতে সব parameter থাকে)।
o	Arrow function এ সেটা থাকে না।
4.	Constructor হিসাবে ব্যবহার করা যায় না
o	সাধারণ function কে constructor বানানো যায় (যেমন new দিয়ে object তৈরি করা)।
o	Arrow function দিয়ে সেটা সম্ভব নয়।

যেসব জায়গায় ব্যবহার করা য়ায়
ছোট কাজের জন্য ব্যবহার করি,
array method (map, filter, forEach ইত্যাদিতে ব্যবহার করি)
callback function এ
object method বা constructor function এর ক্ষেত্রে ব্যবহার করা যাবে না



৪. How does destructuring assignment work in ES6?
Destructuring হলো object বা array এর ভেতরের value গুলোকে আলাদা ভেরিয়েবলে শর্টকাট style এ নেওয়ার সিস্টেম। আগে একে একে extract করতে হতো, এখন এক লাইনে করে ফেলা যায়।
Array থেকে index অনুযায়ী মান বের করা যায়। Array destructuring → position অনুযায়ী মান বের হয়।

Object থেকে key অনুযায়ী মান বের করা যায়। Object destructuring → property name অনুযায়ী মান বের হয়।

যদি কোনো মান না থাকে, তবে default value সেট করা যায়। Default value দেওয়া যায়।
মানে – variable এ fallback value দেওয়া যায়।
Object বা array এর ভেতরে আবার object/array থাকলেও destructure করা যায়। Nested destructuring করা যায়।
Function এর parameter হিসেবেও destructuring ব্যবহার করা যায়।
তাহলে argument object থেকে সরাসরি মান পাওয়া যায়।
Function parameter এ ব্যবহার করা যায়।



৫. Explain template literals in ES6. How are they different from string concatenation?

Template literals হলো ES6 এ আসা একটা নতুন ফিচার যেটা দিয়ে string লেখার সময় backtick (``) ব্যবহার করা হয়।

Variable/Expression embed করা যায় (string এর মধ্যে সরাসরি ভেরিয়েবল ঢোকানো যায়)
Multi-line string লেখা যায় (নতুন লাইন লেখার জন্য আর \n লাগবে না)
Expression calculation করা যায় (string এর ভেতরে সরাসরি calculation বসানো যায়)

#different from string concatenation 
ES6 এর আগে আমরা” +” দিয়ে string জোড়া দিতাম। এতে কোড লম্বা হতো পড়তে কষ্ট হতো
"My name is " + name + " and I am " + age + " years old.";
Template literals এ backtick (`) আর `${}` ব্যবহার করে লিখতে পারি:
`My name is ${name} and I am ${age} years old.`
Concatenation এ একাধিক লাইনের string লিখতে \n ব্যবহার করতে হতো।
কিন্তু template literals এ সরাসরি লাইন ব্রেক দেওয়া যায়।
`This is line one
This is line two
This is line three`

Template literals এর মধ্যে শুধু variable নয়, সরাসরি গণনা/ফাংশনের ফলাফলও রাখা যায়।
`5 + 5 = ${5 + 5}`
