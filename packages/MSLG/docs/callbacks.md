# Callback list

List of predefined helper macro functions.

| Callback  | Description | Support Localization
|-----------|----------------------|---------------------------------------------------------------------------------------
|`Floor`	|Yes	|Rounds down to the nearest integer
|`Ceil`	|Yes	|Rounds up to the nearest integer
|`Abs`	|Yes	|Return the absolute value of numbers
|`Round`	|Yes	|Round number to Int
|`Round`	|Yes	|Rounds a double-precision floating-point value to a specified number of fractional digits.
|`RoundTo1Decimal`	|Yes	|Round number to 1 decimal place
|`RoundTo2Decimal`	|Yes	|Round number to 2 decimal place
|`RoundTo1DecimalInPercentage`	|Yes	|Round number to 1 decimal place and return number with %
|`RoundTo2DecimalInPercentage`	|Yes	|Round number to 2 decimal place and return number with %
|`ConvertNumberWithSeparators`	|Yes	|"Convert a number to format with separator "","" "
|`ParseFloat`	|Yes	|Parse string into float
|`ParseDouble`	|Yes	|Parse string into double
|`ParseInt`	|Yes	|Parse string into int
|`ParseIntWithDefault`	|Yes	|"Parse a string into int, when parse fail, use the given default value "
|`ParseLong`	|Yes	|Parse string into long
|`ParseDateTime`	|Yes	|Parse string into datetime
|`CountWord`	|Yes	|Count the length in words
|`Length`	|Yes	|Returns the length in characters
|`Join`	|Yes	|Join the strings on every separator.
|`Split`	|Yes	|"Split the string with separator, return an array that contains the result. "
|`SubString`	|Yes	|Get a part of a string
|`Replace`	|Yes	|Replace all occurrence of a substring with a replacement
|`ReplaceIgnoreCase`	|Yes	|Replace all occurrence of a substring with a replacement
|`Array`	|Yes	|Form a new array from the parameter.
|`Count`	|Yes	|Returns the number of elements in an array
|`MaxIndex`	|Yes	|Returns a list of index of all the maximum numbers
|`MinIndex`	|Yes	|"Similar to the above, returns minimum instead of maximum "
|`Max`	|Yes	|Returns the maximum number or a number with specified ranking
|`Min`	|Yes	|"Similar to the above, returns minimum instead of maximum "
|`FilterNotEqual`	|Yes	|Returns a copy of original array exluding a certain value
|`SubArray`	|Yes	|Returns the subarray of an array
|`IndexOf`	|Yes	|Return all the indexes of a value in an array
|`ElementAt`	|Yes	|Return the element in an array at specified index
|`GroupKey`	|Yes	|Pairing with GroupCount. Groups an array by value and returns the distinct values (descending order).
|`GroupCount`	|Yes	|"Pairing with GroupKey. Groups an array by value and get the distinct values (descending order), return the count of each values. "
|`AllSame`	|Yes	|Checks if the array only contains same value
|`Sum`	|Yes	|Get the sum of an array
|`Average`	|Yes	|Get the average of an array
|`Random`	|Yes	|Return random element of the given array
|`DayOfMonth`	|Yes	|"Returns the number of one day in a month, say 1, 2, … 31. "
|`DayIndexOfWeek`	|Yes	|"Returns the index of day in week, 0,1,2,3 …,6, corresponding to Sunday to Saturday "
|`DateCheck`	|Yes	|if the Date is in DateRange return true.
|`Month`	|Yes	|Returns the month of the given dateTime
|`Year`	|Yes	|Returns the year of the given dateTime
|`FormatDate`	|Yes	|Format a date based on format string
|`ConvertToLocalTime`	|Yes	|Convert a date to local time
|`Subtract`	|Yes	|Get the difference between two datetimes
|`AddDays`	|Yes	|Add some days to a DateTime
|`AddMinutes`	|Yes	|Add certain minutes to a DateTime
|`AddMilliseconds`	|Yes	|Add certain milliseconds to a DateTime
|`SetYear`	|Yes	|Set year attribute of a datetime
|`SetMonth`	|Yes	|Set month attribute of a datetime
|`SetDay`	|Yes	|Set day attribute of a datetime
|`SetHour`	|Yes	|Set hour attribute of a datetime
|`SetMinute`	|Yes	|Set minute attribute of a datetime
|`SetSecond`	|Yes	|Set second attribute of a datetime
|`SetMillisecond`	|Yes	|Set millisecond attribute of a datetime
|`GetCurrentUserTime`	|Yes	|Get current user time
|`DayOfWeek`	|No. Please don't use in TTS and GUI	|"Returns day of week string, say ""Monday"", ""Tuesday"", … "
|`Exist`	|No	|Check if the value of an object is valid
|`TypeOf`	|No	|Returns the type of a value
|`Pause`	|No	|Add a SSML segment for a break tag. The duration parameter is for millisecond.
|`HasNonEnglishLatinChars`	|No	|Check if given string has non-English characters
|`RemoveStringBetweenChars`	|No	|Remove sub string within two characters
|`TrimSentence`	|No	|Trim a given sentence to result not longer than given word count
|`ToUpperCase`	|No	|Convert a string to upper case
|`ToLowerCase`	|No	|Convert a string to lower case
|`RemoveRepeatedSuffix`	|No	|"Remove the repeated suffix in the string of a list, only keep the first one "
|`AddOrdinal`	|No	|Add ordinal suffix for number
|`Contains`	|No	|Check if contains a special string
|`IsNextWeek`	|No	|Returns if the given dateTime is in next week.
|`IsLastWeek`	|No	|Returns if the given dateTime is in last week.
|`IsYesterday`	|No	|Returns if the given dateTime is yesterday
|`CheckTimeOfDay`	|No	|Check time of day for a give datetime
|`GetDomainNameFromURL`	|?	|Get the domain name from a URL 