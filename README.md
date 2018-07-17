Any document which is used to share information between two entities has some static labels inside the document to help receipient to interpret the information for each format of document usually this static labels does not change.

Static labels are like following words:

“Invoice Number”
“Invoice Date”
“Amount”
“Name”
“Sr.No”
“Part No”
“Description” etc


Each static labels help user to locate and interpret some information in whole document.

Therefore each static label has some related information placed in proximity with that label.


If we are able to find such static labels then finding information related to that static label is easy.

We just need to find it in proximity of that label.

How to find static labels?

Static labels wont change across the documents.

###Approach#1
extract text and find all common texts 
we can say those are static labels.

step1 extract text
step2 tokenize text
step3 create bag of words
step4 find common words
step5 common words would be static labels