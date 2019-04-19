---
id: 4
path: '/an-awesome-sql-operator/'
title: 'An awesome SQL operator'
date: 2016-06-21
author: Yaser Adel Mehraban
popular: true
categories: [sql]
tags: [cross apply, join, query, t-sql]
---

I was working on a problem and I was desperate to do a clean job and not create a mess that no one can maintain it, and accidentally I read an article about SQL `Apply` operator.

<!--more-->

The `APPLY` operator allows you to invoke a table-valued function for each row returned by an outer table expression of a query.

The table-valued function acts as the right input and the outer table expression acts as the left input. The advantage over inner join is that it is faster and you can handle conditional joins easily using this trick.
A quick reminder on the terms.

> INNER JOIN is the most used construct in SQL: it joins two tables together, selecting only those row combinations for which a JOIN condition is true.

```sql
SELECT  *
FROM    tblUser
JOIN    tblProfile
ON      tblUser.Id = tblProfile.UserId
```

But for some tasks the sets are not self-sufficient. For instance, let's consider the following query:
We have `tblUser` and `tblProfile`. `tblProfile` has a column called `rowcount`.

For each row from `tblUser` we need to select first `rowcount` rows from `tblProfile`, ordered by `tblProfile.Id`.

We cannot come up with a join condition here. The join condition, should it exist, would involve the row number, which is not present in `tblProfile`, and there is no way to calculate a row number only from the values of columns of any given row in `tblProfile`.

That's where the `CROSS APPLY` can be used:

```sql
SELECT _
FROM tblUser
CROSS APPLY
(
SELECT TOP (tblUser.rowcount)
FROM tblProfile
ORDER BY
Id
) t2
```

**Summary:**

While most queries which employ `CROSS APPLY` can be rewritten using an `INNER JOIN`, `CROSS APPLY` can yield better execution plan and better performance, since it can limit the set being joined yet before the join occurs.
