<new-issue>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">New Issue</h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-2">
                    <select class="form-control" id="issue-select-prio">
                        <option value="" disabled selected style="display: none;">Priority</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <div class="input-group">
                        <input type="text" id="issue-datepicker" class="form-control" placeholder="pick a date..." aria-label="issue-datepicker">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="new issue...">
                        <span class="input-group-btn">
                            <button class="btn btn-primary" type="button">Create Issue</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</new-issue>