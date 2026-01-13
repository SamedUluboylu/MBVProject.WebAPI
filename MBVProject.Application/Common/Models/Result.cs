using System.Collections.Generic;
using System.Linq;

namespace MBVProject.Application.Common.Models
{
    public class Result
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public List<string> Errors { get; set; } = new();

        public static Result SuccessResult(string message = "Operation completed successfully")
        {
            return new Result { Success = true, Message = message };
        }

        public static Result FailureResult(string message, params string[] errors)
        {
            return new Result
            {
                Success = false,
                Message = message,
                Errors = errors.ToList()
            };
        }

        public static Result FailureResult(string message, List<string> errors)
        {
            return new Result
            {
                Success = false,
                Message = message,
                Errors = errors
            };
        }
    }

    public class Result<T> : Result
    {
        public T? Data { get; set; }

        public static Result<T> SuccessResult(T data, string message = "Operation completed successfully")
        {
            return new Result<T>
            {
                Success = true,
                Message = message,
                Data = data
            };
        }

        public new static Result<T> FailureResult(string message, params string[] errors)
        {
            return new Result<T>
            {
                Success = false,
                Message = message,
                Errors = errors.ToList()
            };
        }

        public new static Result<T> FailureResult(string message, List<string> errors)
        {
            return new Result<T>
            {
                Success = false,
                Message = message,
                Errors = errors
            };
        }
    }
}
